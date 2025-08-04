import React from 'react'

interface QuickAddButtonsProps {
  onAddTime: (hours: number, minutes: number, seconds: number) => void
}

export const QuickAddButtons: React.FC<QuickAddButtonsProps> = ({ onAddTime }) => {
  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => onAddTime(0, 10, 0)}
        className="min-h-11 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
      >
        +10分
      </button>
      <button
        onClick={() => onAddTime(0, 0, 30)}
        className="min-h-11 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
      >
        +30秒
      </button>
      <button
        onClick={() => onAddTime(0, 0, 10)}
        className="min-h-11 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
      >
        +10秒
      </button>
    </div>
  )
}