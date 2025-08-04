import React from 'react'

interface TimeAdjusterProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  type: 'hours' | 'minutes' | 'seconds'
}

export const TimeAdjuster: React.FC<TimeAdjusterProps> = ({
  value,
  onIncrement,
  onDecrement,
  type,
}) => {
  const formattedValue = value.toString().padStart(2, '0')
  
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onIncrement}
        aria-label={`Increase ${type}`}
        className="min-h-11 min-w-11 flex items-center justify-center text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        ＋
      </button>
      <div className="text-4xl md:text-6xl font-mono font-bold my-2">
        {formattedValue}
      </div>
      <button
        onClick={onDecrement}
        aria-label={`Decrease ${type}`}
        className="min-h-11 min-w-11 flex items-center justify-center text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        ー
      </button>
    </div>
  )
}