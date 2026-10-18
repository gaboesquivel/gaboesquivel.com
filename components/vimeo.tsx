interface VimeoPlayerProps {
  url: string;
  title: string;
}

export function VimeoPlayer({ url, title }: VimeoPlayerProps) {
  // Extract Vimeo video ID from URL
  const videoId = url.match(/(?:vimeo\.com\/)(\d+)/)?.[1];

  if (!videoId) {
    return null;
  }

  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      allow="autoplay; fullscreen; picture-in-picture"
      style={{
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
      }}
      title={title}
    />
  );
}
