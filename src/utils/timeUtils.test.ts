import { describe, it, expect } from 'vitest'
import { formatTime, normalizeTime, getTotalSeconds, isValidTime } from './timeUtils'

describe('timeUtils', () => {
  describe('formatTime', () => {
    it('時・分・秒を2桁固定でフォーマットする', () => {
      expect(formatTime(1, 2, 3)).toBe('01:02:03')
      expect(formatTime(10, 20, 30)).toBe('10:20:30')
      expect(formatTime(0, 0, 0)).toBe('00:00:00')
    })

    it('23:59:59を超える値も正しくフォーマットする', () => {
      expect(formatTime(25, 70, 80)).toBe('25:70:80')
    })
  })

  describe('normalizeTime', () => {
    it('60秒を1分に正規化する', () => {
      expect(normalizeTime(0, 0, 60)).toEqual({ hours: 0, minutes: 1, seconds: 0 })
      expect(normalizeTime(0, 0, 125)).toEqual({ hours: 0, minutes: 2, seconds: 5 })
    })

    it('60分を1時間に正規化する', () => {
      expect(normalizeTime(0, 60, 0)).toEqual({ hours: 1, minutes: 0, seconds: 0 })
      expect(normalizeTime(0, 125, 0)).toEqual({ hours: 2, minutes: 5, seconds: 0 })
    })

    it('複合的な正規化を行う', () => {
      expect(normalizeTime(0, 59, 60)).toEqual({ hours: 1, minutes: 0, seconds: 0 })
      expect(normalizeTime(1, 70, 80)).toEqual({ hours: 2, minutes: 11, seconds: 20 })
    })

    it('23:59:59を超える時間も正規化する', () => {
      expect(normalizeTime(25, 0, 0)).toEqual({ hours: 25, minutes: 0, seconds: 0 })
    })
  })

  describe('getTotalSeconds', () => {
    it('時・分・秒を合計秒数に変換する', () => {
      expect(getTotalSeconds(0, 0, 0)).toBe(0)
      expect(getTotalSeconds(0, 0, 1)).toBe(1)
      expect(getTotalSeconds(0, 1, 0)).toBe(60)
      expect(getTotalSeconds(1, 0, 0)).toBe(3600)
      expect(getTotalSeconds(1, 30, 45)).toBe(5445)
    })

    it('23:59:59を超える時間も正しく計算する', () => {
      expect(getTotalSeconds(25, 0, 0)).toBe(90000)
    })
  })

  describe('isValidTime', () => {
    it('有効な時間の場合trueを返す', () => {
      expect(isValidTime(0, 0, 0)).toBe(true)
      expect(isValidTime(23, 59, 59)).toBe(true)
      expect(isValidTime(12, 30, 45)).toBe(true)
    })

    it('負の値がある場合falseを返す', () => {
      expect(isValidTime(-1, 0, 0)).toBe(false)
      expect(isValidTime(0, -1, 0)).toBe(false)
      expect(isValidTime(0, 0, -1)).toBe(false)
    })

    it('23:59:59を超える場合falseを返す', () => {
      expect(isValidTime(24, 0, 0)).toBe(false)
      expect(isValidTime(23, 60, 0)).toBe(false)
      expect(isValidTime(23, 59, 60)).toBe(false)
    })

    it('少数の場合falseを返す', () => {
      expect(isValidTime(1.5, 0, 0)).toBe(false)
      expect(isValidTime(0, 30.5, 0)).toBe(false)
      expect(isValidTime(0, 0, 45.5)).toBe(false)
    })
  })
})