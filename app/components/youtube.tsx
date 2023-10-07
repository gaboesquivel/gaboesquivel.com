"use client"
import { connect } from 'net';
import { useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export function YouTubePlayer ({ url, title }:{url: string, title:string}) {
  const [videoId] = useState(getVideoId(url))


  if (!videoId) return null

  return (
    <LiteYouTubeEmbed
      id={videoId}
      title={title}
    />
  );
};


function getVideoId(video:string){
  const url = new URL(video)
  const params = new URLSearchParams(url.search)
  const videoId = params.get('v')
 return videoId
}