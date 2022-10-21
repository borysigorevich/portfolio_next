import {useEffect, useRef, useCallback} from 'react'

export const useTimeout = (callback: () => void, delay: number) => {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        clearTimeout(timeoutRef.current!)
    }, [])

    useEffect(() => {
        set()
        return clear
    }, [set, clear])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    return {clear, reset}
}