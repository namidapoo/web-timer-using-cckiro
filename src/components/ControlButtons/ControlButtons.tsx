import React from 'react'

interface ControlButtonsProps {
  onStart: () => void
  onClear: () => void
  isDisabled: boolean
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  onStart,
  onClear,
  isDisabled,
}) => {
  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={onStart}
        disabled={isDisabled}
        className={`min-h-11 px-6 py-2 font-bold rounded-lg transition-colors ${
          isDisabled
            ? 'bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        スタート
      </button>
      <button
        onClick={onClear}
        className="min-h-11 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
      >
        クリア
      </button>
    </div>
  )
}