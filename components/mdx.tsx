import { cn } from "lib/utils";
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
  layout = "prose",
  priority,
  width,
  height,
}: {
  src: string;
  alt?: string;
  layout?: "prose" | "wide" | "breakout";
  priority?: boolean;
  width?: string | number;
  height?: string | number;
}) {
  if (src.startsWith("/images/diagrams/"))
    return (
      <figure
        className={cn(
          "diagram-frame my-8",
          layout === "wide" && "blog-media-wide",
          layout === "breakout" && "blog-media-breakout"
        )}
      >
        <img
          alt={alt ?? ""}
          className="diagram"
          decoding="async"
          height={height}
          src={src}
          width={width}
        />
      </figure>
    );

  const sizes =
    layout === "breakout"
      ? "(max-width: 768px) 100vw, min(90rem, 92vw)"
      : layout === "wide"
        ? "(max-width: 768px) 100vw, min(48rem, 90vw)"
        : "(max-width: 768px) 100vw, min(100vw, 650px)";

  return (
    <figure
      className={cn(
        "my-8",
        layout === "wide" && "blog-media-wide",
        layout === "breakout" && "blog-media-breakout"
      )}
    >
      <Image
        alt={alt ?? ""}
        className="rounded-lg"
        fetchPriority={priority ? "high" : undefined}
        height={675}
        preload={priority}
        sizes={sizes}
        src={src}
        width={1200}
      />
    </figure>
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
