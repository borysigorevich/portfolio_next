import { createTheme } from '@mui/material/styles'

export let theme = createTheme({
    palette: {
        primary: {
            main: '#ffd700',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 530,
            md: 768,
            lg: 1024,
            xl: 2560,
        },
    },
})

theme = {
    ...theme,
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: '"Nunito", sans-serif',
                }
            }
        }
    },
}