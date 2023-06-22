import React from 'react'

import Loader from 'react-loaders'

import { Box, Typography } from '@common'
import { AnimatedLetters } from '@components/AnimatedLetters'

import { useLetterClass } from '@hooks'

import { GrReactjs } from 'react-icons/gr'
import { TbBrandCss3, TbBrandJavascript, TbBrandNextjs } from 'react-icons/tb'
import { AiOutlineHtml5 } from 'react-icons/ai'
import { SiMaterialui } from 'react-icons/si'


import * as styles from './AboutStyles'

export const About = () => {
    const letterClass = useLetterClass()

    return (
        <>
            <Box sx={styles.About}>
                <Box sx={styles.Content}>
                    <Typography variant={'h1'} sx={styles.Title}>
                        <AnimatedLetters
                            strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
                            index={15}
                            letterClass={letterClass}
                        />
                    </Typography>
                    <Typography variant={'body1'} sx={styles.Description}>
                        Hello there! I'm a skilled Frontend Developer with 2 years of experience.
                    </Typography>
                </Box>

                <Box sx={styles.Cube}>
                    <Box sx={styles.CubeSpinner}>
                        <Box className={'face1'}>
                            <GrReactjs color={'#5ed4f4'} />
                        </Box>
                        <Box className={'face2'}>
                            <TbBrandNextjs color={'#000'} />
                        </Box>
                        <Box className={'face3'}>
                            <TbBrandCss3 color={'#28a4d9'} />
                        </Box>
                        <Box className={'face4'}>
                            <AiOutlineHtml5 color={'#f06529'} />
                        </Box>
                        <Box className={'face5'}>
                            <TbBrandJavascript color={'#efd81d'} />
                        </Box>
                        <Box className={'face6'}>
                            <SiMaterialui color={'rgb(23, 130, 251)'} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Loader
                active={true}
                type={'pacman'}
            />
        </>
    )
}