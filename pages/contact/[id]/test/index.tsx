import React from 'react'
import {useRouter} from 'next/router'

const Index = () => {
    const router = useRouter()
    console.log(router.query, '**8')
    return (
        <div>
Hello
        </div>
    )
}

export default Index