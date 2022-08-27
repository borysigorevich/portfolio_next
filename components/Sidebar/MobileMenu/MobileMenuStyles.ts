import {SxProps} from '@mui/material/styles'

export const MobileMenu: SxProps = {
    ml: {
        // xs: 'auto',
        sm: '0'
    },
    display: {
        xs: 'block',
        sm: 'none',
    },
    '&.menu-toggle': {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        position: 'relative',


        '& .hamburger, & .cross': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
        },

        '& .hamburger': {
            display: 'flex',
            gap: '3px',
            flexDirection: 'column'
        },

        '& .hamburger span': {
            width: '18px',
            height: '2px',
            position: 'relative',
            overflow: 'hidden',
        },

        '& .hamburger span::after, & .hamburger span::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: '#fff',
            transform: 'translateX(-200%)',
            transition: 'transform ease .3s',
        },

        '& .hamburger span::after': {
            transform: 'translateX(0)',
        },

        '& .hamburger span:nth-child(2)::after, & .hamburger span:nth-child(2)::before': {
            transitionDelay: '.075s'
        },

        '& .hamburger span:nth-child(3)::after, & .hamburger span:nth-child(3)::before': {
            transitionDelay: '.150s'
        },

        '&:hover .hamburger span::before': {
            transform: 'translateX(0)'
        },

        '&:hover .hamburger span::after': {
            transform: 'translateX(200%)'
        },

        '&.active .hamburger span::before': {
            transform: 'translateX(100%)'
        },

        '&.active .hamburger span::after': {
            transform: 'translateX(200%)'
        },


        '& .cross span': {
            display: 'block',
            width: '18px',
            height: '2px',
            bgcolor: '#fff',
            transform: 'translateY(50%) rotate(45deg) scaleX(0)',
            transition: 'transform .200s'
        },

        '& .cross span:last-child': {
            transform: 'translateY(-50%) rotate(-45deg) scaleX(0)',
        },

        '&.active .cross span': {
            transitionDelay: '.450s',
            transform: 'translateY(50%) rotate(45deg) scaleX(1)',
        },

        '&.active .cross span:last-child': {
            transform: 'translateY(-50%) rotate(-45deg) scaleX(1)',
        }

    },

}