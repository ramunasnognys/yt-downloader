'use client'

import { Button } from "@/components/ui/button"
import { Wifi, Clock, X } from 'lucide-react'
import { DownloadProgress as DownloadProgressType } from './types'

interface DownloadProgressProps {
  downloadProgress: DownloadProgressType
  onCancel: () => void
  complete: boolean
}

export function DownloadProgress({ 
  downloadProgress, 
  onCancel, 
  complete 
}: DownloadProgressProps) {
  return (
    <div className="space-y-6">
      <div className="relative pt-1">
        <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-primary/20">
          <div
            style={{ width: `${downloadProgress.progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary to-primary-foreground transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="text-center">
          <span className="text-3xl font-bold">{downloadProgress.progress}%</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <Wifi className="w-4 h-4 mr-2 text-primary" />
          <span>Download Speed: {downloadProgress.speed}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          <span>Time Remaining: {downloadProgress.estimatedTime}</span>
        </div>
      </div>
      {!complete && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="text-destructive hover:bg-destructive/10"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Download
          </Button>
        </div>
      )}
    </div>
  )
}