'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Youtube } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UrlInputProps {
  onFetch: (url: string) => void
  loading: boolean
}

export function UrlInput({ onFetch, loading }: UrlInputProps) {
  const [url, setUrl] = useState('')

  return (
    <div className="space-y-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <Input
                type="url"
                placeholder="Enter a valid YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/50 bg-background shadow-sm"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Paste a YouTube video URL here</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button 
        className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors duration-200" 
        onClick={() => onFetch(url)} 
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Fetching Video...
          </span>
        ) : (
          'Fetch Video'
        )}
      </Button>
    </div>
  )
}