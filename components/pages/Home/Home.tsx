import React from 'react';
import {useRouter} from 'next/router'

import {Container, Box, Typography, Button, Image} from '@common'
import {AnimatedLetters} from "@components/AnimatedLetters";
import {useLetterClass} from '@hooks'

import {Logo} from "./Logo";
import * as styles from './HomeStyles'
import Loader from "react-loaders";


export const Home = () => {
    const router = useRouter()
    const letterClass = useLetterClass()
    const nameArray = ['l', 'o', 'b', 'o', 'd', 'a', 'n', ',']
    const jobArray = ['w', 'e', 'b', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.']

    const handleNavigate = () => router.push('/contact')

    return (
        <>
            <Box sx={styles.Home}>
                <Typography variant={'h1'} sx={styles.Title}>
                    <Box sx={styles.TextAnimate(9)} component={'span'} className={letterClass}>H</Box>
                    <Box sx={styles.TextAnimate(10)} component={'span'} className={letterClass}>i</Box>
                    <Box sx={styles.TextAnimate(11)} component={'span'} className={letterClass}>,</Box>
                    <br/>
                    <Box sx={styles.TextAnimate(12)} component={'span'} className={letterClass}>I</Box>
                    <Box sx={styles.TextAnimate(13)} component={'span'} className={letterClass}>’</Box>
                    <Box sx={styles.TextAnimate(14)} component={'span'} className={letterClass}>m</Box>
                    &nbsp;
                    <Box sx={styles.ImgBox}>
                        <Image
                            className={'letter-img'}
                            src={'/images/logo-s.png'}
                            width={32}
                            height={52}
                        />
                    </Box>
                    <AnimatedLetters
                        letterClass={letterClass}
                        index={15}
                        strArray={nameArray}
                    />
                    <br/>
                    <AnimatedLetters letterClass={letterClass} index={23} strArray={jobArray}/>
                </Typography>
                <Typography variant={'h2'} sx={styles.SubTitle}>
                    Front End Developer
                </Typography>

                <Button
                    variant={'outlined'}
                    onClick={handleNavigate}
                    sx={styles.Button}
                >
                    contact me
                </Button>
            </Box>
            <Logo/>
            <Loader
                active={true}
                type={'pacman'}
            />
        </>
    );
};