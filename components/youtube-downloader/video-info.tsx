'use client'

import { VideoInfo as VideoInfoType } from './types'
import { ImageIcon } from 'lucide-react'

interface VideoInfoProps {
  videoInfo: VideoInfoType
}

export function VideoInfo({ videoInfo }: VideoInfoProps) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        {videoInfo.thumbnail ? (
          <img src={videoInfo.thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{videoInfo.title}</h3>
        <p className="text-sm text-muted-foreground">{videoInfo.creator}</p>
      </div>
    </div>
  )
}