import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimer } from './useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('初期状態', () => {
    it('初期値は0時0分0秒', () => {
      const { result } = renderHook(() => useTimer())
      
      expect(result.current.time.hours).toBe(0)
      expect(result.current.time.minutes).toBe(0)
      expect(result.current.time.seconds).toBe(0)
      expect(result.current.time.isRunning).toBe(false)
    })

    it('初期状態でスタートボタンは無効', () => {
      const { result } = renderHook(() => useTimer())
      
      expect(result.current.isStartDisabled).toBe(true)
    })
  })

  describe('時間設定', () => {
    it('時間を設定できる', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setHours(1)
      })
      expect(result.current.time.hours).toBe(1)
      
      act(() => {
        result.current.setMinutes(30)
      })
      expect(result.current.time.minutes).toBe(30)
      
      act(() => {
        result.current.setSeconds(45)
      })
      expect(result.current.time.seconds).toBe(45)
    })

    it('上限を超える値は設定されない', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setHours(24)
        result.current.setMinutes(60)
        result.current.setSeconds(60)
      })
      
      expect(result.current.time.hours).toBe(0)
      expect(result.current.time.minutes).toBe(0)
      expect(result.current.time.seconds).toBe(0)
    })

    it('負の値は設定されない', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setHours(-1)
        result.current.setMinutes(-1)
        result.current.setSeconds(-1)
      })
      
      expect(result.current.time.hours).toBe(0)
      expect(result.current.time.minutes).toBe(0)
      expect(result.current.time.seconds).toBe(0)
    })
  })

  describe('時間追加', () => {
    it('時間を追加できる', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.addTime(0, 10, 0) // +10分
      })
      expect(result.current.time.minutes).toBe(10)
      
      act(() => {
        result.current.addTime(0, 0, 30) // +30秒
      })
      expect(result.current.time.minutes).toBe(10)
      expect(result.current.time.seconds).toBe(30)
      
      act(() => {
        result.current.addTime(0, 0, 10) // +10秒
      })
      expect(result.current.time.seconds).toBe(40)
    })

    it('60秒以上は分に繰り上がる', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setSeconds(50)
        result.current.addTime(0, 0, 20) // 50 + 20 = 70秒
      })
      
      expect(result.current.time.minutes).toBe(1)
      expect(result.current.time.seconds).toBe(10)
    })

    it('23:59:59を超えた場合は23:59:59に制限される', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setHours(23)
        result.current.setMinutes(59)
        result.current.setSeconds(50)
        result.current.addTime(0, 0, 20) // 23:59:50 + 20秒
      })
      
      expect(result.current.time.hours).toBe(23)
      expect(result.current.time.minutes).toBe(59)
      expect(result.current.time.seconds).toBe(59)
    })
  })

  describe('タイマー動作', () => {
    it('スタートボタンでタイマーが開始される', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setSeconds(5)
      })
      
      expect(result.current.isStartDisabled).toBe(false)
      
      act(() => {
        result.current.start()
      })
      
      expect(result.current.time.isRunning).toBe(true)
    })

    it('タイマーが1秒ごとにカウントダウンする', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setSeconds(3)
        result.current.start()
      })
      
      expect(result.current.time.seconds).toBe(3)
      
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(result.current.time.seconds).toBe(2)
      
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(result.current.time.seconds).toBe(1)
      
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(result.current.time.seconds).toBe(0)
      expect(result.current.time.isRunning).toBe(false)
    })

    it('分から秒への繰り下がりが正しく動作する', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setMinutes(1)
        result.current.setSeconds(0)
        result.current.start()
      })
      
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      
      expect(result.current.time.minutes).toBe(0)
      expect(result.current.time.seconds).toBe(59)
    })
  })

  describe('クリア機能', () => {
    it('クリアボタンで00:00:00にリセットされる', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setHours(1)
        result.current.setMinutes(30)
        result.current.setSeconds(45)
      })
      
      act(() => {
        result.current.clear()
      })
      
      expect(result.current.time.hours).toBe(0)
      expect(result.current.time.minutes).toBe(0)
      expect(result.current.time.seconds).toBe(0)
    })

    it('実行中のタイマーもクリアで停止する', () => {
      const { result } = renderHook(() => useTimer())
      
      act(() => {
        result.current.setSeconds(10)
        result.current.start()
      })
      
      expect(result.current.time.isRunning).toBe(true)
      
      act(() => {
        result.current.clear()
      })
      
      expect(result.current.time.isRunning).toBe(false)
      expect(result.current.time.seconds).toBe(0)
    })
  })
})