import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        backgroundImage:
          'url(https://gaboesquivel.com/images/opengraph-image.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        background: 'black',
      }}
    />,
    {
      width: 1920,
      height: 1080,
    },
  )
}
