import {SxProps} from '@mui/material/styles'

const cubeSpinner: SxProps = {
    '0': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    },
    '16%': {
        transform: 'rotateY(-90deg)'
    },
    '33%': {
        transform: 'rotateY(-90deg) rotateZ(90deg)'
    },
    '50%': {
        transform: 'rotateY(-180deg) rotateZ(90deg)'
    },
    '66%': {
        transform: 'rotateY(-270deg) rotateZ(90deg)'
    },
    '83%': {
        transform: 'rotateX(90deg) '
    }

}

export const About: SxProps = {
    opacity: '0',
    animation: 'fadeIn 1s 1s forwards',
    display: 'grid',
    gridTemplateColumns: {
        xs: '1fr',
        md: '1fr 1fr'
    },
    placeContent: 'center'
}

export const Content: SxProps = {
    mb: {
        xs: '100px',
        md: '0'
    }
}

export const Title: SxProps = {
    color: '#ffd700',
    fontFamily: 'Coolvetica',
    fontWeight: '400',
    maxWidth: 'fit-content',
    position: 'relative',
    mb: '40px',
    ml: {
        xs: '0',
        lg: '-10px'
    },

    ':before': {
        content: '"<h1>"',
        color: '#ffd700',
        fontSize: '18px',
        fontFamily: 'La Belle Aurore',
        position: 'absolute',
        top: '-26px',
        left: {
            xs: '0',
            lg: '-10px'
        },
        opacity: '.6'
    },

    ':after': {
        content: '"</h1>"',
        color: '#ffd700',
        fontSize: '18px',
        fontFamily: 'La Belle Aurore',
        position: 'absolute',
        left: {
            xs: '0',
            lg: '-10px'
        },
        bottom: '-26px',
        opacity: '.6'
    },

    '& span:hover': {
        color: '#fff !important'
    }
}

export const Description: SxProps = {
    fontSize: '13px',
    fontWeight: '300',
    color: '#fff'
}


export const Cube: SxProps = {
    height: '200px',
    transformStyle: 'preserve-3d',
}

export const CubeSpinner: SxProps = {
    ml: 'calc(50% - 100px)',
    willChange: 'transform',
    transformStyle: 'preserve-3d',
    transformOrigin: '100px 100px 0',
    '@keyframes cubeSpinner': cubeSpinner,

    animation: 'cubeSpinner ease-in-out 10s infinite',


    'div': {
        height: '200px',
        width: '200px',
        position: 'absolute',
        border: 1,
        borderColor: '#ccc',
        background: 'rgba(255, 255, 255, .4)',
        display: 'grid',
        placeContent: 'center',
        fontSize: '100px',
        boxShadow: '0 0 20px 0 lightyellow',
        // webkitTransformStyle: 'preserve-3d',
        // '-webkit-transform-style': 'preserve-3d',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
    },

    '.face1': {
        transform: 'translateZ(100px)'
    },
    '.face2': {
        transform: 'rotateY(90deg) translateZ(100px)'
    },
    '.face3': {
        transform: 'rotateY(90deg) rotateX(90deg) translateZ(100px)'
    },
    '.face4': {
        transform: 'rotateY(180deg) rotateZ(90deg) translateZ(100px)'
    },
    '.face5': {
        transform: 'rotateY(-90deg) rotateZ(90deg) translateZ(100px)'
    },
    '.face6': {
        transform: 'rotateX(-90deg) translateZ(100px)'
    },

}