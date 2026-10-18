"use client";

import { useState } from "react";

interface VideoEmbedProps {
  videoId: string;
  platform?: "youtube" | "vimeo";
  title?: string;
}

const posterFor = ({
  videoId,
  platform,
}: {
  videoId: string;
  platform: "youtube" | "vimeo";
}) =>
  platform === "youtube"
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://vumbnail.com/${videoId}.jpg`;

const embedUrlFor = ({
  videoId,
  platform,
}: {
  videoId: string;
  platform: "youtube" | "vimeo";
}) =>
  platform === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
    : `https://player.vimeo.com/video/${videoId}`;

export function VideoEmbed({
  videoId,
  platform = "youtube",
  title = "Video embed",
}: VideoEmbedProps) {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      <button
        type="button"
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900"
        aria-label={`Play video: ${title}`}
        onClick={() => setActive(true)}
      >
        <img
          src={posterFor({ videoId, platform })}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <span
          className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50"
          aria-hidden
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-lg text-black">
            ▶
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={embedUrlFor({ platform, videoId })}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 h-full w-full border-0"
      />
    </div>
  );
}
