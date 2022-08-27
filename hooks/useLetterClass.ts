import {useState, useEffect} from 'react'

export const useLetterClass = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)

        return () => clearTimeout(timeoutId)
    }, [])

    return letterClass
}