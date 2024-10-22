'use client'

import { VideoInfo } from './types'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from 'lucide-react'

interface ResolutionSelectorProps {
  videoInfo: VideoInfo
  selectedResolution: string
  onResolutionChange: (resolution: string) => void
}

export function ResolutionSelector({ 
  videoInfo, 
  selectedResolution, 
  onResolutionChange 
}: ResolutionSelectorProps) {
  return (
    <RadioGroup 
      value={selectedResolution} 
      onValueChange={onResolutionChange} 
      className="space-y-1"
    >
      {videoInfo.resolutions.map((res, index) => (
        <div 
          key={res.quality} 
          className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors ${
            selectedResolution === res.quality ? 'bg-primary/10' : 'hover:bg-muted'
          }`}
        >
          <RadioGroupItem value={res.quality} id={res.quality} />
          <Label htmlFor={res.quality} className="flex justify-between w-full cursor-pointer">
            <span className="font-medium">{res.quality}</span>
            <span className="flex items-center">
              {index === 0 && (
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full mr-2 flex items-center">
                  <Check className="w-3 h-3 mr-1" />
                  Recommended
                </span>
              )}
              <span className="text-muted-foreground">{res.size}</span>
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}