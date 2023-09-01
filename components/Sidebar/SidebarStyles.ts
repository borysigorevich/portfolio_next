import {SxProps} from '@mui/material/styles'

export const Navbar: SxProps = {
    p: {
        xs: '0 8px',
        lg: '0'
    },
    background: '#181818',
    position: 'relative',
    // height: {
    //     xs: '60px',
    //     lg: '100%'
    // },
    overflowY: 'hidden',
    display: {
        xs: 'grid',
        lg: 'block'
    },
    alignItems: 'center',
    // justifyContent: {
    //     xs: 'space-between',
    //     sm: 'unset'
    // },
    justifyItems: {
        xs: 'end',
        sm: 'unset'
    },
    gridTemplateColumns: {
        xs: '50px 1fr',
        sm: '1fr 8fr 1fr',
        lg: '1fr'
    }
}

export const Logo: SxProps = {
    pt: '7px',
    display: 'grid',
    gridTemplateColumns: {
        xs: '50px',
        lg: 'auto'
    },
    gap: '5px',
    textAlign: 'center',
    cursor: 'pointer'
}

export const Letter: SxProps = {
    textAlign: 'center',
    height: {
        xs: '23px',
        lg: '40px'
    }
}

export const Word: SxProps = {
    height: {
        xs: '15px',
        lg: '24px'
    }
}

export const LinksBox: (isActive: boolean) => SxProps = (isActive) => ({
    transition: '.3s',
    position: {
        xs: 'fixed',
        sm: 'static',
        lg: 'absolute'
    },
    zIndex: '5',
    top: {
        xs: '60px',
        lg: '50%'
    },
    p: {
        xs: '12px 0',
        sm: '0'
    },
    bgcolor: {
        xs: '#181818',
        sm: 'unset'
    },
    left: {
        xs: isActive ? '0' : '100%',
        lg: '0'
    },
    opacity: {
        xs: isActive ? 1 : 0,
        sm: 1
    },
    width: '100%',
    transform: {
        lg: 'translateY(-50%)'
    },
    display: 'grid',
    gridTemplateColumns: {
        xs: 'repeat(3, 50px)',
        lg: '1fr'
    },
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',

    '.icon-box': {
        position: 'relative',
        textAlign: 'center',

        '.icon': {
            transition: '.3s',
        },

        '&.home::before': {
            content: '"home"',
        },

        '&.about::before': {
            content: '"about"',
        },

        '&.contact::before': {
            content: '"contact"',
        },

        '::before': {
            top: '50%',
            left: '0',
            right: '0',
            position: 'absolute',
            color: '#ffd700',
            fontSize: '9px',
            letterSpacing: '2px',
            transform: 'translateY(-50%)',
            transition: '.3s',
            textTransform: 'uppercase',
            opacity: '0',
        },

        ':hover': {
            '.icon': {
                opacity: '0',
                color: '#ffd700'
            },

            '::before': {
                opacity: 1
            }
        }

    },

})

export const ActiveLink: (isActive: boolean) => SxProps = isActive => ({
    '& .icon': {
        color: isActive ? '#ffd700' : '#4d4d4e'
    }
})

export const SocialLinks: SxProps = {
    display: {
        xs: 'none',
        sm: 'grid'
    },
    gridTemplateColumns: {
        xs: 'repeat(4, auto)',
        lg: '1fr'
    },
    textAlign: 'center',
    alignItems: 'center',

    position: {
        xs: 'static',
        lg: 'absolute',
    },
    bottom: {
        xs: 'unset',
        lg: '20px'
    },
    left: {
        xs: 'unset',
        lg: '0'
    },
    right: {
        xs: 'unset',
        lg: '0'
    },
    gap: '8px',

    'svg': {

        transition: '.3s',

        ':hover': {
            color: '#ffd700'
        }
    }
}