export interface VideoInfo {
    title: string
    creator: string
    thumbnail: string
    resolutions: Resolution[]
  }
  
  export interface Resolution {
    quality: string
    size: string
  }
  
  export interface DownloadProgress {
    progress: number
    speed: string
    estimatedTime: string
  }