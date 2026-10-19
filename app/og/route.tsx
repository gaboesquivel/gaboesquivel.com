import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        background: "black",
        backgroundImage:
          "url(https://gaboesquivel.com/images/opengraph-image.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    />,
    {
      height: 1080,
      width: 1920,
    }
  );
}
