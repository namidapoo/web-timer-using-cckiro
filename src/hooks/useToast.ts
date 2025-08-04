import { useCallback, useState } from 'react'

export function useToast() {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }, [])

  return { showToast, message }
}