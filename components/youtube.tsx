"use client"
import { useState } from 'react';

export function YouTubePlayer ({ url, title }:{url: string, title:string}) {
  const [videoId] = useState(getVideoId(url))


  if (!videoId) return null

  return (
    <iframe width={"100%"} height={"100%"} src={`https://www.youtube.com/embed/${videoId}?rel=0`} title={title}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen />  
  );
};


function getVideoId(video:string){
  const url = new URL(video)
  const params = new URLSearchParams(url.search)
  const videoId = params.get('v')
 return videoId
}