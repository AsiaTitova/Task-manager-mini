import type { FC } from 'react'
import { useState, useEffect } from 'react'

import { useTimer } from 'shared/lib'
import { Button } from 'shared/ui/Button'

import type { IToast } from '../../model'
import { usePortalToastStore } from '../../model'

import module from './Toast.module.scss'

interface IProps<T> {
  item: IToast<T>
}

export const Toast: FC<IProps<unknown>> = ({ item }) => {
  const { deleteToast } = usePortalToastStore()
  const initialTime = 5
  const { time, handleResendTimer } = useTimer(initialTime)

  const [isCheckCancelHandle, setIsCheckCancelHandle] = useState(false)

  const resetToast = (): void => {
    handleResendTimer()
    deleteToast(item.id)
  }

  const closeHandler = async (cancelCheck: boolean): Promise<void> => {
    if (!cancelCheck && item.successHandle) {
      item?.successHandle()
    }
    resetToast()
    setIsCheckCancelHandle(false)
  }

  const cancelHandler = (): void => {
    if (item.cancelHandle) item?.cancelHandle()
    setIsCheckCancelHandle(true)
    closeHandler(true)
  }

  const progressValue = (time / initialTime) * 100

  useEffect(() => {
    const path = document?.querySelector(
      `#Meter_${String(item?.id)}`
    ) as SVGPathElement

    if (path) {
      const length = path.getTotalLength()
      const to = length * ((100 - progressValue) / 100)
      path.style.strokeDashoffset = `${Math.max(0, to)}`
    }
  }, [time, progressValue])

  useEffect(() => {
    const timer = setTimeout(() => closeHandler(isCheckCancelHandle), 6000)
    return (): void => clearTimeout(timer)
  }, [isCheckCancelHandle])

  return (
    <div className={module.Toast} onClick={() => cancelHandler()}>
      <div className={module.Toast_timer}>
        <div className={module.Toast_time}>{time}</div>
        <div className={module.Toast_circle}>
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className={module.Toast_svg}
            width="20"
            height="20">
            <circle r="45" cx="50" cy="50" />
            <path
              id={`Meter_${String(item?.id)}`}
              className={module.Toast_meter}
              d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <p>{item.label}</p>
      {item.cancelLabel && (
        <Button
          className={module.Toast_button}
          size="xs"
          label={item.cancelLabel}
        />
      )}
    </div>
  )
}
