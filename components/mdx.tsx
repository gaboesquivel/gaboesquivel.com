import Image from "next/image";
import Link from "next/link";
import * as runtime from "react/jsx-runtime";

import { TweetComponent } from "./tweet";
import { VideoEmbed } from "./video-embed";

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const CustomLink = (props) => {
  const { href } = props;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function BlogImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      alt={alt ?? ""}
      src={src}
      width={1200}
      height={675}
      sizes="(max-width: 768px) 100vw, min(100vw, 650px)"
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      className="rounded-lg"
    />
  );
}

function RoundedImage(props: { alt?: string; src: string }) {
  return <BlogImage alt={props.alt} src={props.src} />;
}

function Callout(props) {
  return (
    <div className="my-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="my-8 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                className="h-4 w-4 text-emerald-500"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Checkmark icon"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="my-8 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
                role="img"
                aria-label="X icon"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YouTubeEmbed({ id, title }: { id: string; title?: string }) {
  return <VideoEmbed videoId={id} platform="youtube" title={title} />;
}

function VimeoEmbed({ id, title }: { id: string; title?: string }) {
  return <VideoEmbed videoId={id} platform="vimeo" title={title} />;
}

const components = {
  BlogImage,
  Callout,
  ConsCard,
  Image: RoundedImage,
  ProsCard,
  StaticTweet: TweetComponent,
  VideoEmbed,
  Vimeo: VimeoEmbed,
  YouTube: YouTubeEmbed,
  a: CustomLink,
};

export function Mdx({ code }: { code: string }) {
  const Component = getMDXComponent(code);

  return (
    <article className="blog-content prose prose-quoteless prose-neutral dark:prose-invert">
      <Component components={components} />
    </article>
  );
}
