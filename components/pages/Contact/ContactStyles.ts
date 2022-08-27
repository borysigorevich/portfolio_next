import {SxProps} from '@mui/material/styles'

export const Contact: SxProps = {
    opacity: 0,
    display: 'grid',
    gridTemplateColumns: {
        xs: '100%',
        md: '4.5fr 5.5fr'
    },
    animation: 'fadeIn 1s 1s forwards',
    p: {
        xs: '0 20px 70px',
        md: '0'
    }
}

export const Left: SxProps = {
    mb: {
        xs: 5,
        md: '0'
    }
}

export const Title: SxProps = {
    color: '#ffd700',
    fontFamily: 'Coolvetica',
    fontWeight: '400',
    maxWidth: 'fit-content',
    position: 'relative',
    fontSize: {
        xs: '47px',
        lg: '53px'
    },
    mb: '40px',

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
        left: '0',
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
    color: '#fff',
    mb: '30px'
}

export const Form: SxProps = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    maxWidth: {
        xs: '100%',
        md: '80%'
    },
    gap: '10px',

    '.input': {
        background: '#115173',
        border: '0',
        color: '#fff',
        animation: 'fadeInUp 1s 1s forwards',


        ':focus': {
            outline: 'none',
        },

        '&::placeholder': {
            fontWeight: '300',
            color: 'rgba(255, 255, 255, .6)'
        },
    },

    '.name': {
        width: '100%',
        height: '50px',
        p: '0 20px'
    },
    '.email': {
        width: '100%',
        height: '50px',
        p: '0 20px'
    },
    '.subject': {
        width: '100%',
        height: '50px',
        p: '0 20px'
    },
    '.message': {
        width: '100%',
        height: '100%',
        p: '20px',
        resize: 'none',
    }
}

export const InputBox: (error:boolean) => SxProps = (error) => ({
    position: 'relative',


    '::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        background: error ? 'red' : '#ffd700',
        left: '0',
        height: '2px',
        width: error ? '100%' : '0',
        transition: '.3s'
    },

    ':focus-within::after,': {
        width: '100%'
    },

    '&.name-box': {
        gridColumn: '1 / 2',
    },

    '&.email-box': {
        gridColumn: '2 / 3',
    },

    '&.subject-box': {
        gridColumn: '1 / 3',
    },

    '&.message-box': {
        gridColumn: '1 / 3',
        height: '140px'
    }
})



export const Name: SxProps = {
    gridColumn: '1 / 2',
}

export const Email: SxProps = {
    gridColumn: '2 / 3',
}

export const Subject: SxProps = {
    gridColumn: '1 / 3',
}

export const Message: SxProps = {
    gridColumn: '1 / 3',
    height: '140px'
}

export const Button: SxProps = {
    gridColumn: '2 / 3',
    maxWidth: 'fit-content',
    justifySelf: 'end',
    fontSize: '13px',
    fontWeight: '400',
    letterSpacing: '4px',
    borderRadius: '4px',
    mr: '10px',
    border: 1.2,
    animation: 'fadeIn 1s backwards',
    animationDelay: '1.8s',

    ':hover': {
        bgcolor: '#ffd700',
        color: '#022c43'
    }
}

export const InfoMap: SxProps = {
    position: 'absolute',
    background: '#000',
    top: {
        xs: 'unset',
        md: '100px'
    },
    bottom: {
        xs: '70px',
        md: 'unset'
    },
    right: {
        xs: '40px',
        sm: '60px',
        md: '20%',
        lg: '30%'
    },
    zIndex: '999',
    width: '240px',
    p: '20px',
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: '17px',
    fontWeight: '300',
    opacity: '0',
    animation :'fadeIn 1s 1.5s forwards',

    'span': {
        mt: '20px',
        display: 'block'
    }

}