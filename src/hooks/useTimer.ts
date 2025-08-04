import { useState, useCallback, useRef, useEffect } from 'react'
import { normalizeTime, getTotalSeconds } from '../utils/timeUtils'

interface TimerState {
  hours: number
  minutes: number
  seconds: number
  isRunning: boolean
}

interface UseTimerReturn {
  time: TimerState
  setHours: (hours: number) => void
  setMinutes: (minutes: number) => void
  setSeconds: (seconds: number) => void
  addTime: (hours: number, minutes: number, seconds: number) => void
  start: () => void
  clear: () => void
  isStartDisabled: boolean
}

export function useTimer(): UseTimerReturn {
  const [time, setTime] = useState<TimerState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
  })

  const intervalRef = useRef<number | null>(null)

  const setHours = useCallback((hours: number) => {
    if (hours >= 0 && hours <= 23 && Number.isInteger(hours)) {
      setTime(prev => ({ ...prev, hours }))
    }
  }, [])

  const setMinutes = useCallback((minutes: number) => {
    if (minutes >= 0 && minutes <= 59 && Number.isInteger(minutes)) {
      setTime(prev => ({ ...prev, minutes }))
    }
  }, [])

  const setSeconds = useCallback((seconds: number) => {
    if (seconds >= 0 && seconds <= 59 && Number.isInteger(seconds)) {
      setTime(prev => ({ ...prev, seconds }))
    }
  }, [])

  const addTime = useCallback((hours: number, minutes: number, seconds: number) => {
    setTime(prev => {
      const newTotalSeconds = getTotalSeconds(prev.hours, prev.minutes, prev.seconds) + 
                             getTotalSeconds(hours, minutes, seconds)
      
      // 23:59:59の上限チェック
      const maxSeconds = getTotalSeconds(23, 59, 59)
      const limitedSeconds = Math.min(newTotalSeconds, maxSeconds)
      
      const normalized = normalizeTime(0, 0, limitedSeconds)
      
      return {
        ...prev,
        hours: normalized.hours,
        minutes: normalized.minutes,
        seconds: normalized.seconds,
      }
    })
  }, [])

  const start = useCallback(() => {
    setTime(prev => ({ ...prev, isRunning: true }))
  }, [])

  const clear = useCallback(() => {
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRunning: false,
    })
  }, [])

  // カウントダウンロジック
  useEffect(() => {
    if (time.isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime(prev => {
          const totalSeconds = getTotalSeconds(prev.hours, prev.minutes, prev.seconds)
          
          if (totalSeconds <= 0) {
            return { ...prev, isRunning: false }
          }
          
          const newTotalSeconds = totalSeconds - 1
          const normalized = normalizeTime(0, 0, newTotalSeconds)
          
          return {
            hours: normalized.hours,
            minutes: normalized.minutes,
            seconds: normalized.seconds,
            isRunning: newTotalSeconds > 0,
          }
        })
      }, 1000)
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [time.isRunning])

  const isStartDisabled = time.hours === 0 && time.minutes === 0 && time.seconds === 0

  return {
    time,
    setHours,
    setMinutes,
    setSeconds,
    addTime,
    start,
    clear,
    isStartDisabled,
  }
}