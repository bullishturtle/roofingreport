"use client"

import { useState, useEffect } from "react"

interface UseLoadingStateOptions {
  initialState?: boolean
  minLoadingTime?: number
}

export function useLoadingState({ initialState = true, minLoadingTime = 1000 }: UseLoadingStateOptions = {}) {
  const [isLoading, setIsLoading] = useState(initialState)
  const [startTime, setStartTime] = useState(initialState ? Date.now() : 0)

  const startLoading = () => {
    setIsLoading(true)
    setStartTime(Date.now())
  }

  const stopLoading = () => {
    const elapsedTime = Date.now() - startTime
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

    if (remainingTime === 0) {
      setIsLoading(false)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, remainingTime)
    }
  }

  useEffect(() => {
    if (initialState) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, minLoadingTime)

      return () => clearTimeout(timer)
    }
  }, [initialState, minLoadingTime])

  return { isLoading, startLoading, stopLoading }
}
