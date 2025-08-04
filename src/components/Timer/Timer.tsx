import React, { useEffect } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { useToast } from '../../hooks/useToast'
import { TimeDisplay } from '../TimeDisplay/TimeDisplay'
import { TimeAdjuster } from '../TimeAdjuster/TimeAdjuster'
import { QuickAddButtons } from '../QuickAddButtons/QuickAddButtons'
import { ControlButtons } from '../ControlButtons/ControlButtons'

export const Timer: React.FC = () => {
  const {
    time,
    setHours,
    setMinutes,
    setSeconds,
    addTime,
    start,
    clear,
    isStartDisabled,
  } = useTimer()

  const { showToast, message } = useToast()

  // タイマー終了時の通知
  useEffect(() => {
    if (!time.isRunning && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      // 初回レンダリング時は通知しない
      const isInitialRender = !window.timerHasStarted
      if (!isInitialRender) {
        showToast('タイマーが終了しました！')
      }
    }
    if (time.isRunning) {
      window.timerHasStarted = true
    }
  }, [time.isRunning, time.hours, time.minutes, time.seconds, showToast])

  const handleIncrementHours = () => {
    const newValue = time.hours + 1
    if (newValue <= 23) {
      setHours(newValue)
    }
  }

  const handleDecrementHours = () => {
    const newValue = time.hours - 1
    if (newValue >= 0) {
      setHours(newValue)
    }
  }

  const handleIncrementMinutes = () => {
    const newValue = time.minutes + 1
    if (newValue <= 59) {
      setMinutes(newValue)
    }
  }

  const handleDecrementMinutes = () => {
    const newValue = time.minutes - 1
    if (newValue >= 0) {
      setMinutes(newValue)
    }
  }

  const handleIncrementSeconds = () => {
    const newValue = time.seconds + 1
    if (newValue <= 59) {
      setSeconds(newValue)
    }
  }

  const handleDecrementSeconds = () => {
    const newValue = time.seconds - 1
    if (newValue >= 0) {
      setSeconds(newValue)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Web Timer
        </h1>
        
        <div className="mb-8">
          <TimeDisplay
            hours={time.hours}
            minutes={time.minutes}
            seconds={time.seconds}
          />
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <TimeAdjuster
            value={time.hours}
            onIncrement={handleIncrementHours}
            onDecrement={handleDecrementHours}
            type="hours"
          />
          <TimeAdjuster
            value={time.minutes}
            onIncrement={handleIncrementMinutes}
            onDecrement={handleDecrementMinutes}
            type="minutes"
          />
          <TimeAdjuster
            value={time.seconds}
            onIncrement={handleIncrementSeconds}
            onDecrement={handleDecrementSeconds}
            type="seconds"
          />
        </div>

        <div className="mb-8">
          <QuickAddButtons onAddTime={addTime} />
        </div>

        <ControlButtons
          onStart={start}
          onClear={clear}
          isDisabled={isStartDisabled}
        />

        {/* トースト通知 */}
        {message && (
          <div
            role="alert"
            aria-live="polite"
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

// グローバル変数の型定義
declare global {
  interface Window {
    timerHasStarted?: boolean
  }
}