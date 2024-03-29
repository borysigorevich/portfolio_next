import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Box, Button, Typography } from '@common'
import { AnimatedLetters } from '@components/AnimatedLetters'
import { useLetterClass } from '@hooks'
import * as styles from './HomeStyles'
import Loader from 'react-loaders'

const Logo = dynamic(() => import('./Logo/Logo'), { ssr: false })


export const Home = () => {
    const router = useRouter()
    const letterClass = useLetterClass()
    const nameArray = ['B', 'o', 'r', 'i', 's', ',']
    const jobArray = ['R', 'e', 'a', 'c', 't', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.']

    // class Person {
    //     public name: string
    //     constructor(name: string){
    //         this.name = name
    //     }
    //
    //     test = () => {
    //         console.log(this.name)
    //     }
    // }
    //
    // new Person('boris').test()


    // console.log('before promise')
    // const promise = new Promise((res, rej) => {
    //     console.log('Promise start')
    //     setTimeout(() => {
    //         console.log('after 2 sec')
    //     }, 2000)
    // })
    // console.log('after promise')

    // const flatten = (arr: (number | number[])[]) => {
    //     const result: number[] = []
    //
    //     arr.forEach(value => {
    //         if (Array.isArray(value)) {
    //             result.push(...flatten(value))
    //         } else {
    //             result.push(value)
    //         }
    //     })
    //     return result
    // }
    //
    const handleNavigate = () => router.push('/contact')


    return (
        <>
            {/*@ts-ignore*/}
            <Box sx={styles.Home}>
                <Typography variant={'h1'} sx={styles.Title}>
                    <Box
                        sx={styles.TextAnimate(9)}
                        component={'span'}
                        className={letterClass}
                    >H</Box>
                    <Box
                        sx={styles.TextAnimate(10)}
                        component={'span'}
                        className={letterClass}
                    >i</Box>
                    <Box
                        sx={styles.TextAnimate(11)}
                        component={'span'}
                        className={letterClass}
                    >,</Box>
                    <br />
                    <Box
                        sx={styles.TextAnimate(12)}
                        component={'span'}
                        className={letterClass}
                    >I</Box>
                    <Box
                        sx={styles.TextAnimate(13)}
                        component={'span'}
                        className={letterClass}
                    >’</Box>
                    <Box
                        sx={styles.TextAnimate(14)}
                        component={'span'}
                        className={letterClass}
                    >m</Box>
                    &nbsp;
                    {/*<Box sx={styles.ImgBox}>*/}
                    {/*    <Image*/}
                    {/*        className={'letter-img'}*/}
                    {/*        src={'/images/logo-s.png'}*/}
                    {/*        width={32}*/}
                    {/*        height={52}*/}
                    {/*    />*/}
                    {/*</Box>*/}
                    <AnimatedLetters
                        letterClass={letterClass}
                        index={15}
                        strArray={nameArray}
                    />
                    <br />
                    <AnimatedLetters letterClass={letterClass} index={23} strArray={jobArray} />
                </Typography>
                <Typography variant={'h2'} sx={styles.SubTitle}>
                    Greetings and welcome to my personal file portfolio! This is a space where I showcase my skills and
                    expertise as a React Developer.
                </Typography>

                <Button
                    variant={'outlined'}
                    onClick={handleNavigate}
                    sx={styles.Button}
                >
                    contact me
                </Button>
            </Box>
            <Logo />
            <Loader
                active={true}
                type={'pacman'}
            />
        </>
    )
}