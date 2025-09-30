'use client'

interface VideoEmbedProps {
  videoId: string
  platform?: 'youtube' | 'vimeo'
  title?: string
}

export function VideoEmbed({
  videoId,
  platform = 'youtube',
  title = 'Video embed',
}: VideoEmbedProps) {
  const embedUrl =
    platform === 'youtube'
      ? `https://www.youtube.com/embed/${videoId}?rel=0`
      : `https://player.vimeo.com/video/${videoId}`

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg relative">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  )
}
