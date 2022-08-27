import React, {ReactNode} from 'react';
import {Box, Container} from "@common";
import {Sidebar} from '@components'

import * as styles from './LayoutStyles'
import {PageComponent} from "./LayoutStyles";
import Loader from "react-loaders";

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    return (
        <Box sx={styles.Layout}>
            <Sidebar/>
            <Box sx={styles.Main}>
                <Box sx={styles.Tag} className={'top-tag'}>&lt;body&gt;</Box>

                <Box sx={styles.PageComponent}>
                    {children}
                </Box>

                <Box sx={styles.Tag} className={'mid-tag'}>&lt;/body&gt;</Box>
                <Box sx={styles.Tag} className={'bottom-tag'}>&lt;/html&gt;</Box>
            </Box>
        </Box>
    );
};