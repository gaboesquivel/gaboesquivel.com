"use client";

import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";
import { applyDocumentTheme } from "@modelcontextprotocol/ext-apps";
import {
  AppBridge,
  PostMessageTransport,
} from "@modelcontextprotocol/ext-apps/app-bridge";
import { mcpHostCapabilitiesForProfile } from "lib/mcp/mcp-host-capabilities";
import type { McpHostCapabilityProfile } from "lib/mcp/mcp-host-capabilities";
import { mcpHostSleep } from "lib/mcp/mcp-host-timing";
import { useCallback, useEffect, useRef, useState } from "react";

type HostLabMode = "ui" | "text-only";

const toolResultText = (
  content: { type: string; text?: string }[] | undefined
) => {
  const block = content?.find((part) => part.type === "text");
  return block && block.type === "text" && block.text ? block.text : "";
};

const waitForIframeLoad = async (iframe: HTMLIFrameElement) => {
  while (iframe.contentDocument?.readyState !== "complete") {
    await mcpHostSleep(50);
  }
};

export const McpHostLab = ({
  capabilityProfile,
  mcpUrl,
  referenceViewPath,
}: {
  capabilityProfile: McpHostCapabilityProfile;
  mcpUrl: string;
  referenceViewPath: string;
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const bridgeRef = useRef<AppBridge | null>(null);
  const clientRef = useRef<Client | null>(null);
  const [mode, setMode] = useState<HostLabMode>("ui");
  const [initialized, setInitialized] = useState(false);
  const [toolText, setToolText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(390);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const teardown = useCallback(async () => {
    setInitialized(false);
    await bridgeRef.current?.teardownResource({}).catch(() => {});
    await bridgeRef.current?.close().catch(() => {});
    bridgeRef.current = null;
    await clientRef.current?.close().catch(() => {});
    clientRef.current = null;
  }, []);

  const connectBridge = useCallback(async () => {
    setError(null);
    await teardown();

    const client = new Client({ name: "host-lab", version: "1.0.0" });
    clientRef.current = client;

    if (mode === "text-only") {
      const transport = new StreamableHTTPClientTransport(
        new URL(mcpUrl, window.location.origin)
      );
      await client.connect(transport);
      const result = await client.callTool({
        arguments: {},
        name: "get_profile",
      });
      setToolText(toolResultText(result.content));
      await client.close();
      clientRef.current = null;
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe) {
      setError("iframe not mounted");
      return;
    }
    await waitForIframeLoad(iframe);
    const contentWindow = iframe.contentWindow;
    if (!contentWindow) {
      setError("iframe missing contentWindow");
      return;
    }

    const httpTransport = new StreamableHTTPClientTransport(
      new URL(mcpUrl, window.location.origin)
    );
    await client.connect(httpTransport);

    const bridge = new AppBridge(
      client,
      { name: "gaboesquivel-host-lab", version: "1.0.0" },
      mcpHostCapabilitiesForProfile(capabilityProfile),
      { hostContext: { theme, displayMode: "inline" } }
    );

    if (capabilityProfile === "full") {
      bridge.onopenlink = async () => ({});
      bridge.onmessage = async () => ({});
    }

    bridge.addEventListener("initialized", async () => {
      setInitialized(true);
      await bridge.sendToolInput({
        arguments: { focus: "ai" },
      });
      const result = await client.callTool({
        arguments: {},
        name: "get_profile",
      });
      await bridge.sendToolResult({
        content: result.content ?? [],
        structuredContent: result.structuredContent,
      });
      setToolText(toolResultText(result.content));
    });

    const postTransport = new PostMessageTransport(
      contentWindow,
      contentWindow
    );
    await bridge.connect(postTransport);
    bridgeRef.current = bridge;
  }, [capabilityProfile, mcpUrl, mode, teardown, theme]);

  useEffect(() => {
    applyDocumentTheme(theme);
  }, [theme]);

  useEffect(
    () => () => {
      teardown().catch(() => {});
    },
    [teardown]
  );

  return (
    <div className="space-y-4 p-6 text-white" data-testid="mcp-host-lab">
      <p
        className="text-xs text-neutral-400"
        data-testid="mcp-host-capability-profile"
      >
        {capabilityProfile}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          className="rounded border border-neutral-600 px-3 py-1 text-sm"
          data-testid="mcp-host-connect"
          onClick={() => {
            connectBridge().catch((connectError) => {
              setError(
                connectError instanceof Error
                  ? connectError.message
                  : "connect failed"
              );
            });
          }}
          type="button"
        >
          Connect
        </button>
        <button
          className="rounded border border-neutral-600 px-3 py-1 text-sm"
          data-testid="mcp-host-disconnect"
          onClick={() => {
            teardown().catch(() => {});
          }}
          type="button"
        >
          Disconnect
        </button>
        <button
          className="rounded border border-neutral-600 px-3 py-1 text-sm"
          data-testid="mcp-host-mode-text"
          onClick={() => setMode("text-only")}
          type="button"
        >
          Text-only
        </button>
        <button
          className="rounded border border-neutral-600 px-3 py-1 text-sm"
          data-testid="mcp-host-mode-ui"
          onClick={() => setMode("ui")}
          type="button"
        >
          UI bridge
        </button>
        <button
          className="rounded border border-neutral-600 px-3 py-1 text-sm"
          data-testid="mcp-host-theme-toggle"
          onClick={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
          type="button"
        >
          Toggle theme
        </button>
      </div>
      <label className="flex items-center gap-2 text-sm">
        Container width
        <input
          data-testid="mcp-host-width"
          max={1024}
          min={320}
          onChange={(event) => setContainerWidth(Number(event.target.value))}
          type="range"
          value={containerWidth}
        />
        <span data-testid="mcp-host-width-value">{containerWidth}px</span>
      </label>
      <p data-testid="mcp-host-initialized">
        {initialized ? "bridge-initialized" : "bridge-pending"}
      </p>
      <p className="text-sm text-neutral-300" data-testid="mcp-host-tool-text">
        {toolText}
      </p>
      {error && (
        <p className="text-sm text-red-300" data-testid="mcp-host-error">
          {error}
        </p>
      )}
      {mode === "ui" && (
        <div
          className="overflow-hidden rounded border border-neutral-700"
          data-testid="mcp-host-container"
          style={{ maxWidth: containerWidth, width: "100%" }}
        >
          <iframe
            className="min-h-[12rem] w-full bg-transparent"
            data-testid="mcp-host-iframe"
            ref={iframeRef}
            src={referenceViewPath}
            title="MCP reference view"
          />
        </div>
      )}
    </div>
  );
};
