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
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      title={title}
    />
  );
} 