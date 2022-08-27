import {SxProps} from '@mui/material/styles'

const fadeIn: SxProps = {
    from: {
        opacity: '0'
    },
    to: {
        opacity: '1'
    }
}

const pathLengthFadeIn: SxProps = {
    from: {
        strokeDashoffset: '35000'
    },
    to: {
        strokeDashoffset: '0'
    }
}

export const Logo: SxProps = {
    position: 'absolute',
    right: {
        xs: '50%',
        md: '20%',
    },
    top: {
        xs: '30px',
        md: '50%'
    },
    transform: {
        xs: 'translateX(50%)',
        md: 'translateY(-50%)'
    },
    width: {
        xs: '263px',
        lg: '400px'
    },
    height: {
        xs: '422px',
        lg: '641px'
    },

    zIndex: '-1',

    '@keyframes logoFadeIn': fadeIn,


    '@keyframes pathLengthFadeIn': pathLengthFadeIn,

    '& span': {
        overflow: 'visible !important'
    },

    '.logo': {
        opacity: 0,
        transform: 'rotateZ(30deg) translateZ(59px) !important',
        animation: 'logoFadeIn 4s forwards',
        animationDelay: '4s',
        position: 'absolute',
        zIndex: '1',
    },


    'svg': {
        transform: 'rotateZ(30deg) !important',
        width: {
            xs: '263px',
            lg: '400px'
        },
        height: {
            xs: '422px',
            lg: '641px'
        },
    },

    '.svg-container': {
        stroke: '#ffd700',
        strokeWidth: '10px',

        'path': {
            pathLength: '0',
            strokeDasharray: '35000',
            strokeDashoffset: '35000',


            animation: 'pathLengthFadeIn 3s forwards',
            animationDelay: '1s'
        },

    }
}