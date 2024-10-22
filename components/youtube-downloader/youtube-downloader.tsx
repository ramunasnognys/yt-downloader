'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UrlInput } from './url-input'
import { VideoInfo as VideoInfoComponent } from './video-info'
import { ResolutionSelector } from './resolution-selector'
import { DownloadProgress } from './download-progress'
import { VideoInfo } from './types'

export default function YouTubeDownloader() {
  const [screen, setScreen] = useState<'url' | 'resolution' | 'download'>('url')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [selectedResolution, setSelectedResolution] = useState('')
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [downloadSpeed, setDownloadSpeed] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [downloadComplete, setDownloadComplete] = useState(false)

  const handleFetchVideo = (url: string) => {
    setLoading(true)
    // Simulating API call
    setTimeout(() => {
      setVideoInfo({
        title: 'Sample YouTube Video',
        creator: 'John Doe',
        thumbnail: '/placeholder.svg?height=200&width=300',
        resolutions: [
          { quality: '720p', size: '100MB' },
          { quality: '480p', size: '50MB' },
          { quality: '360p', size: '30MB' },
        ]
      })
      setLoading(false)
      setScreen('resolution')
    }, 2000)
  }

  const handleDownload = () => {
    setScreen('download')
    let progress = 0
    const interval = setInterval(() => {
      progress += 1
      setDownloadProgress(progress)
      setDownloadSpeed('2.5 MB/s')
      if (progress >= 100) {
        clearInterval(interval)
        setDownloadComplete(true)
      }
    }, 300)
  }

  const handleCancel = () => {
    setScreen('resolution')
    setDownloadProgress(0)
    setDownloadSpeed('')
    setEstimatedTime('')
  }

  const handleReset = () => {
    setScreen('url')
    setVideoInfo(null)
    setSelectedResolution('')
    setDownloadProgress(0)
    setDownloadSpeed('')
    setEstimatedTime('')
    setDownloadComplete(false)
  }

  useEffect(() => {
    if (downloadProgress > 0 && downloadProgress < 100) {
      const estimatedSeconds = (100 - downloadProgress) * 0.3
      const minutes = Math.floor(estimatedSeconds / 60)
      const seconds = Math.floor(estimatedSeconds % 60)
      setEstimatedTime(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    }
  }, [downloadProgress])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
          <Youtube className="mr-2 h-6 w-6" />
          YouTube Video Downloader
        </CardTitle>
      </CardHeader>
      <CardContent>
        {screen === 'url' && (
          <UrlInput onFetch={handleFetchVideo} loading={loading} />
        )}
        {screen === 'resolution' && videoInfo && (
          <div className="space-y-6">
            <VideoInfoComponent videoInfo={videoInfo} />
            <ResolutionSelector
              videoInfo={videoInfo}
              selectedResolution={selectedResolution}
              onResolutionChange={setSelectedResolution}
            />
          </div>
        )}
        {screen === 'download' && (
          <DownloadProgress
            downloadProgress={{
              progress: downloadProgress,
              speed: downloadSpeed,
              estimatedTime: estimatedTime
            }}
            onCancel={handleCancel}
            complete={downloadComplete}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {screen === 'resolution' && (
          <>
            <Button variant="outline" onClick={() => setScreen('url')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button 
              onClick={handleDownload} 
              disabled={!selectedResolution}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" /> Download
            </Button>
          </>
        )}
        {downloadComplete && (
          <>
            <Button variant="outline" onClick={handleReset}>
              Download Another
            </Button>
            <Button>
              Open File
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}