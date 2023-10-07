"use client"
import { useState } from 'react';
import YouTube from 'react-youtube';

export function YouTubePlayer ({ url }:{url: string}) {
  const [videoId] = useState(getVideoId(url))
  // Set up event handlers
  const onReady = (event) => {
    // Access the player instance
    const player = event.target;

    // For example, you can automatically play the video
    // player.playVideo();
  };

  const onError = (error) => {
    console.error('YouTube Player Error:', error);
  };

  if (!videoId) return null

  return (
    <YouTube
      videoId={videoId}
      onReady={onReady}
      onError={onError}
    />
  );
};


function getVideoId(video:string){
  const url = new URL(video)
  const params = new URLSearchParams(url.search)
 return params.get('v')
}