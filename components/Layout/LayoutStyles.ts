import {SxProps} from '@mui/material/styles'

export const Layout: SxProps = {
    display: 'grid',
    gridTemplateColumns: {
        xs: '1fr',
        lg: '60px 1fr'
    },
    gridTemplateRows: {
        xs: '60px 1fr',
        lg: '1fr'
    },
    overflow: 'hidden',
    minHeight: '100vh'
}

export const Main: SxProps = {
    position: 'relative',
    willChange: 'contents',
    opacity: '0',
    transformStyle: 'preserve-3d',
    animation: 'fadeIn 1s forwards',
    animationDelay: '1s'
}

export const PageComponent: SxProps = {
    position: 'relative',
    height: '100%',
    top: {
        md: '0'
    },
    p: {
        xs: '100px 20px 0',
        sm: ' 100px 40px 0',
        lg: '0 100px'
    },
    display: 'grid',
    alignContent: {
        xs: 'start',
        md: 'center'
    },
}

export const Tag: SxProps = {
    color: '#ffd700',
    position: 'absolute',
    opacity: '.6',
    fontSize: '18px',
    fontFamily: 'La Belle Aurore, sans-serif',
    left: {
        xs: '20px',
        lg: '70px'
    },

    '&.top-tag': {
        top: {
            xs: '30px',
            lg: '55px'
        }
    },
    '&.mid-tag': {
        bottom: '35px'
    },
    '&.bottom-tag': {
        ml: '-10px',
        bottom: '10px'
    },
}