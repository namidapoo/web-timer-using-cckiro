import React from 'react'
import { formatTime } from '../../utils/timeUtils'

interface TimeDisplayProps {
  hours: number
  minutes: number
  seconds: number
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ hours, minutes, seconds }) => {
  const formattedTime = formatTime(hours, minutes, seconds)
  const ariaLabel = `Timer: ${hours} hours ${minutes} minutes ${seconds} seconds`

  return (
    <div
      role="timer"
      aria-label={ariaLabel}
      className="text-6xl md:text-8xl font-mono font-bold text-center"
    >
      {formattedTime}
    </div>
  )
}