import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
 
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
          backgroundImage: 'url(https://gaboesquivel.com/images/opengraph-image.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          background: 'black'
        }}
      >
        {/* <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }}
        /> */}
        {/* <div
          style={{
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            fontSize: 130,
            // fontFamily: 'monospace',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
            width: '75%',
            textAlign: 'center',
            zIndex: 2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            background: 'rgba(0, 0, 0, 0.7)'
          }}
        >
          {postTitle}
        </div> */}
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
