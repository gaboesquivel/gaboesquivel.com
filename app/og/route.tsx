import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';
import bgimage from '../opengraph-image.png';
import Image from 'next/image';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
  const font = fetch(
    new URL('../../public/fonts/kaisei-tokumin-bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

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
          position: 'relative'
        }}
      >
        <Image
          src={bgimage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          style={{ zIndex: -1 }}
        />
        <div
          style={{
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            fontSize: 130,
            fontFamily: 'Kaisei Tokumin',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: '#54e8b3',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
            width: '70%',
            textAlign: 'center',
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Kaisei Tokumin',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
