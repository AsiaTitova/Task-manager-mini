import { useEffect, useState } from 'react'

interface UseTimerReturn {
  time: number
  formatTime: (seconds: number) => string
  handleResendTimer: () => void
}

export const useTimer = (initialTime: number): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const handleResendTimer = (): void => {
    if (timer) {
      clearInterval(timer)
    }
    setTime(initialTime)
  }

  useEffect(() => {
    const newTimer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(newTimer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
    setTimer(newTimer)

    return (): void => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [])

  useEffect(() => {
    if (time === initialTime && timer) {
      clearInterval(timer)
      const newTimer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(newTimer)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
      setTimer(newTimer)
    }
  }, [time])

  return {
    time,
    formatTime,
    handleResendTimer
  }
}
