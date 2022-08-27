import {SxProps} from '@mui/material/styles'

export const Map: SxProps = {
    background: 'rgba(8, 253, 216, .1)',
    position: {
        xs: 'static',
        md: 'absolute'
    },
    height: {
        xs: '320px',
        md: '100%'
    },
    right: {
        md: '0'
    },
    top: {
        md: '0'
    },
    bottom: {
        md: '0'
    },
    width: {
        xs: '100%',
        md: '55%'
    },

    '.leaflet-container': {
        width: '100%',
        height: '100%',
        opacity: '0',
        animation: 'backInRight 1s 1.2s forwards',
    }
}