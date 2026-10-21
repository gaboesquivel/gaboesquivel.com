import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import * as runtime from "react/jsx-runtime";

import { VideoEmbed } from "./video-embed";

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const CustomLink = ({
  href,
  ...props
}: ComponentProps<"a"> & { href: string }) => {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a href={href} {...props} />;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
};

function BlogImage({
  src,
  alt,
  priority,
  width,
  height,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  width?: string | number;
  height?: string | number;
}) {
  if (src.startsWith("/images/diagrams/"))
    return (
      <span className="diagram-frame">
        <img
          alt={alt ?? ""}
          className="diagram"
          decoding="async"
          height={height}
          src={src}
          width={width}
        />
      </span>
    );

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

function YouTubeEmbed({ id, title }: { id: string; title?: string }) {
  return <VideoEmbed videoId={id} platform="youtube" title={title} />;
}

const components = {
  BlogImage,
  Image: RoundedImage,
  VideoEmbed,
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
