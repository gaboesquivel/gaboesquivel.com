"use client";

import { App, PostMessageTransport } from "@modelcontextprotocol/ext-apps";
import { mcpHostRaceTimeout, mcpHostSleep } from "lib/mcp/mcp-host-timing";
import { useEffect, useRef, useState } from "react";

const connectDelayMs = 300;
const connectTimeoutMs = 2000;

/**
 * Minimal MCP App view for host-bridge harness tests (not the production GenUI app).
 */
export const McpReferenceView = () => {
  const appRef = useRef<App | null>(null);
  const [toolInput, setToolInput] = useState<string>("{}");
  const [hostContext, setHostContext] = useState<string>("{}");
  const [writeProbe, setWriteProbe] = useState("idle");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const wireApp = (app: App) => {
      app.ontoolinput = (notification) => {
        setToolInput(JSON.stringify(notification.arguments ?? {}));
      };
      app.ontoolresult = (notification) => {
        setToolInput(JSON.stringify(notification.result ?? {}));
      };
      app.onhostcontextchanged = (notification) => {
        setHostContext(JSON.stringify(notification.hostContext ?? {}));
      };
    };

    const attemptConnect = async () => {
      for (;;) {
        if (cancelled) return;
        const app = new App({
          name: "gaboesquivel-reference-view",
          version: "1.0.0",
        });
        appRef.current = app;
        wireApp(app);
        const transport = new PostMessageTransport(
          window.parent,
          window.parent
        );
        try {
          await mcpHostRaceTimeout({
            ms: connectTimeoutMs,
            task: app.connect(transport),
          });
          if (!cancelled) setReady(true);
          return;
        } catch {
          transport.close().catch(() => {});
          await mcpHostSleep(connectDelayMs);
        }
      }
    };

    attemptConnect().catch(() => setReady(false));

    return () => {
      cancelled = true;
      appRef.current = null;
    };
  }, []);

  const probeOpenLink = async () => {
    const app = appRef.current;
    if (!app) {
      setWriteProbe("openLink-error:no-app");
      return;
    }
    try {
      await app.openLink({ url: "https://example.com" });
      setWriteProbe("openLink-ok");
    } catch (error) {
      setWriteProbe(
        `openLink-error:${error instanceof Error ? error.message : "failed"}`
      );
    }
  };

  const probeSendMessage = async () => {
    const app = appRef.current;
    if (!app) {
      setWriteProbe("sendMessage-error:no-app");
      return;
    }
    try {
      await app.sendMessage({
        content: [{ text: "probe", type: "text" }],
        role: "user",
      });
      setWriteProbe("sendMessage-ok");
    } catch (error) {
      setWriteProbe(
        `sendMessage-error:${error instanceof Error ? error.message : "failed"}`
      );
    }
  };

  return (
    <div
      className="min-h-[8rem] bg-neutral-900 p-4 text-sm text-neutral-100"
      data-mcp-app-initialized={ready ? "true" : "false"}
      data-testid="mcp-reference-view"
    >
      <p data-testid="mcp-reference-ready">
        {ready ? "initialized" : "pending"}
      </p>
      <p
        className="text-xs text-neutral-400"
        data-testid="mcp-reference-host-context"
      >
        {hostContext}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          className="rounded border border-neutral-600 px-2 py-1 text-xs"
          data-testid="mcp-reference-probe-open-link"
          onClick={() => {
            probeOpenLink().catch(() =>
              setWriteProbe("openLink-error:unhandled")
            );
          }}
          type="button"
        >
          Probe openLink
        </button>
        <button
          className="rounded border border-neutral-600 px-2 py-1 text-xs"
          data-testid="mcp-reference-probe-send-message"
          onClick={() => {
            probeSendMessage().catch(() =>
              setWriteProbe("sendMessage-error:unhandled")
            );
          }}
          type="button"
        >
          Probe sendMessage
        </button>
      </div>
      <p className="mt-2 text-xs" data-testid="mcp-reference-write-probe">
        {writeProbe}
      </p>
      <pre
        className="mt-2 overflow-auto text-xs text-neutral-300"
        data-testid="mcp-reference-tool-payload"
      >
        {toolInput}
      </pre>
    </div>
  );
};
