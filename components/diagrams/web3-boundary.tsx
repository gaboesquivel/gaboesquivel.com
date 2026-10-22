const accent = "#5cded6";
const stroke = "rgba(255, 255, 255, 0.14)";
const label = "rgba(255, 255, 255, 0.75)";
const muted = "rgba(255, 255, 255, 0.64)";

export function Web3BoundaryDiagram() {
  return (
    <svg
      aria-labelledby="web3-boundary-title"
      className="mt-8 w-full max-w-full"
      role="img"
      viewBox="0 0 720 200"
    >
      <title id="web3-boundary-title">
        Product surface, signing boundary, and indexed chain data
      </title>
      <rect
        fill="none"
        height="120"
        rx="8"
        stroke={stroke}
        width="252"
        x="16"
        y="40"
      />
      <text
        fill={label}
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        x="32"
        y="68"
      >
        Product surface
      </text>
      <text
        fill={muted}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        x="32"
        y="92"
      >
        Wallet, trading, auctions
      </text>

      <rect
        fill="none"
        height="120"
        rx="8"
        stroke={accent}
        strokeWidth="1.5"
        width="128"
        x="296"
        y="40"
      />
      <text
        fill={accent}
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        textAnchor="middle"
        x="360"
        y="106"
      >
        Signing
      </text>

      <rect
        fill="none"
        height="120"
        rx="8"
        stroke={stroke}
        width="252"
        x="452"
        y="40"
      />
      <text
        fill={label}
        fontFamily="ui-monospace, monospace"
        fontSize="12"
        x="468"
        y="68"
      >
        Chain &amp; index
      </text>
      <text
        fill={muted}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        x="468"
        y="92"
      >
        Protocols, GraphQL, streams
      </text>

      <path d="M 268 100 H 296" stroke={stroke} strokeWidth="1.5" />
      <path d="M 424 100 H 452" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}
