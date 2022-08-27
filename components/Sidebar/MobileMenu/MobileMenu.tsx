import React, {Dispatch, SetStateAction} from 'react';
import {Box} from '@common'

import * as styles from './MobileMenuStyles'

type MobileMenuProps = {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}

export const MobileMenu = ({open, setOpen}: MobileMenuProps) => {

    const handleOpen = () => setOpen(prev => !prev)

    return (
        <>
            <Box
                className={`menu-toggle ${open ? 'active' : ''}`}
                sx={styles.MobileMenu}
                onClick={handleOpen}
            >
                <Box className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </Box>
                <Box className="cross">
                    <span></span>
                    <span></span>
                </Box>
            </Box>

        </>
    );
};