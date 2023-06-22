import {SxProps} from '@mui/material/styles'

export const Home: SxProps = {
    opacity: '0',
    animation: 'fadeIn 1s 1s forwards',
    willChange: 'contents',
    position: 'relative',
    zIndex: 2,
    width: 'fit-content'
}

export const Title: SxProps = {
    color: '#fff',
    fontSize: {
        xs: '47px',
        lg: '53px'
    },
    fontFamily: 'Coolvetica',
    fontWeight: '400',
    position: 'relative',
    maxWidth: 'fit-content',
    mb: '20px',

    ':before': {
        content: '"<h1>"',
        color: '#ffd700',
        fontSize: '18px',
        fontFamily: 'La Belle Aurore',
        position: 'absolute',
        top: '-26px',
        left: '0',
        opacity: '.6'
    },

    ':after': {
        content: '"</h1>"',
        color: '#ffd700',
        fontSize: '18px',
        fontFamily: 'La Belle Aurore',
        position: 'absolute',
        right: '-46px',
        bottom: '0',
        opacity: '.6'
    },

    '.letter-img': {
        overflow: 'visible !important',
        animation: 'rotateIn .3s linear both',
        animationDelay: '1.4s'
    }
}

export const ImgBox: SxProps = {
    display: 'inline-block',
    'span': {
        overflow: 'visible !important',
    }
}

export const SubTitle: SxProps = {
    maxWidth: '50%',
    fontWeight: '400',
    fontSize: '14px',
    color: '#8d8d8d',
    letterSpacing: '3px',
    // fontFamily: 'sans-serif',
    animation: 'fadeIn 1s backwards',
    animationDelay: '1.8s',
    mb: '20px',
}

export const Button: SxProps = {
    fontSize: '13px',
    fontWeight: '400',
    letterSpacing: '4px',
    borderRadius: '0',
    border: 1.2,
    // width: '157px',

    position: 'relative',

    display: {
        xs: 'none',
        md: 'block'
    },

    animation: 'fadeIn 1s backwards',
    animationDelay: '1s',

    ':hover': {
        bgcolor: '#ffd700',
        color: '#022c43'
    }
}

export const TextAnimate: (index: number) => SxProps = (index) => {

    return {
        '&.text-animate': {
            display: 'inline-block',
            opacity: '0',
            animation: 'bounceIn 1s forwards',
            animationDelay: index / 10 + 's',
            minWidth: '10px',
        },

        '&.text-animate-hover': {
            display: 'inline-block',
            minWidth: '10px',
            animationFillMode: 'both',
            transition: '.3s',

            '&:hover': {
                color: '#ffd700',
                animation: 'rubberBand 1s',
            }
        },
    }

}


