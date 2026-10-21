const getVideoId = (video: string) => {
  const url = new URL(video);
  const params = new URLSearchParams(url.search);
  return params.get("v");
};

export function YouTubePlayer({ url, title }: { url: string; title: string }) {
  const videoId = getVideoId(url);

  if (!videoId) {
    return null;
  }

  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
      title={title}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
