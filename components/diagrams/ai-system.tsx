const accent = "#5cded6";
const stroke = "rgba(255, 255, 255, 0.14)";
const label = "rgba(255, 255, 255, 0.75)";
const muted = "rgba(255, 255, 255, 0.64)";

export function AiSystemDiagram() {
  return (
    <svg
      aria-labelledby="ai-system-title"
      className="mt-8 w-full max-w-full"
      role="img"
      viewBox="0 0 720 252"
    >
      <title id="ai-system-title">
        LegalAgent: voice and chat, retrieval over case context, and admin
        controls feeding the assistant
      </title>
      <rect
        fill="none"
        height="140"
        rx="8"
        stroke={stroke}
        width="200"
        x="16"
        y="8"
      />
      <text
        fill={label}
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        x="32"
        y="36"
      >
        Voice &amp; chat
      </text>
      <text
        fill={muted}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        x="32"
        y="60"
      >
        React Native app
      </text>

      <rect
        fill="none"
        height="140"
        rx="8"
        stroke={stroke}
        width="200"
        x="260"
        y="8"
      />
      <text
        fill={label}
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        x="276"
        y="36"
      >
        Retrieval
      </text>
      <text
        fill={muted}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        x="276"
        y="60"
      >
        Cases, documents,
      </text>
      <text
        fill={muted}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        x="276"
        y="76"
      >
        procedures
      </text>

      <rect
        fill="none"
        height="140"
        rx="8"
        stroke={stroke}
        width="200"
        x="504"
        y="8"
      />
      <text
        fill={label}
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        x="520"
        y="36"
      >
        Admin controls
      </text>
      <text
        fill={muted}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        x="520"
        y="60"
      >
        Prompts, documents,
      </text>
      <text
        fill={muted}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        x="520"
        y="76"
      >
        SSO, categories
      </text>

      <path d="M 216 78 H 260" stroke={stroke} strokeWidth="1.5" />
      <path d="M 460 78 H 504" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M 604 148 C 604 196, 116 196, 116 148"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
      />
      <text
        fill={accent}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        textAnchor="middle"
        x="360"
        y="228"
      >
        operate after launch
      </text>
    </svg>
  );
}
