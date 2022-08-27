import React from 'react';
import {Box} from '@common'

type AnimatedLettersProps = {
    letterClass: string
    strArray: string[]
    index: number
}

import {TextAnimate} from '../pages/Home/HomeStyles'

export const AnimatedLetters = ({letterClass, index, strArray}: AnimatedLettersProps) => {
    return (
        // <Box component={'span'}>
        <>
            {
                strArray.map((char, i) => (
                    <Box key={char + index + i} sx={TextAnimate(i + index)} component={'span'} className={letterClass}>
                        {char}
                    </Box>
                ))
            }
        </>
        // </Box>
    );
};