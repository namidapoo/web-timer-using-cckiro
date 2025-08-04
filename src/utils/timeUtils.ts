export function formatTime(hours: number, minutes: number, seconds: number): string {
  const pad = (num: number) => num.toString().padStart(2, '0')
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export function normalizeTime(
  hours: number,
  minutes: number,
  seconds: number
): { hours: number; minutes: number; seconds: number } {
  const totalSeconds = getTotalSeconds(hours, minutes, seconds)
  const normalizedHours = Math.floor(totalSeconds / 3600)
  const normalizedMinutes = Math.floor((totalSeconds % 3600) / 60)
  const normalizedSeconds = totalSeconds % 60

  return {
    hours: normalizedHours,
    minutes: normalizedMinutes,
    seconds: normalizedSeconds,
  }
}

export function getTotalSeconds(hours: number, minutes: number, seconds: number): number {
  return hours * 3600 + minutes * 60 + seconds
}

export function isValidTime(hours: number, minutes: number, seconds: number): boolean {
  // 整数チェック
  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || !Number.isInteger(seconds)) {
    return false
  }

  // 負の値チェック
  if (hours < 0 || minutes < 0 || seconds < 0) {
    return false
  }

  // 上限チェック（23:59:59）
  if (hours > 23 || minutes > 59 || seconds > 59) {
    return false
  }

  return true
}