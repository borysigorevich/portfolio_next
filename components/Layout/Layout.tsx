import React, {ReactNode, Children, useEffect, useState} from 'react';
import {Box, Container} from "@common";
import {Sidebar} from '@components'

import * as styles from './LayoutStyles'
import {PageComponent} from "./LayoutStyles";
import Loader from "react-loaders";

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {

    // const sum = (...args: number[]) => args.reduce((result, number) => result += number, 0)
    //
    // const stringIncludes = (string1: string, string2: string) => string1.toUpperCase().includes(string2.toUpperCase())
    // // const getNames = (names: { [key: string]: string | number }[]) => names.map((value) => value['name']).filter(value => value)
    // const getNames = (names: { [key: string]: string | number }[]) => {
    //     const resultNamesArray: string[] = []
    //     names.forEach(value => {
    //         if(value.hasOwnProperty('name')) resultNamesArray.push(value['name'] as string)
    //     })
    //     return resultNamesArray
    // }
    // const largestNumbersIndex = (arr: number[]) => Math.max(...arr)
    // const delay = (milliseconds: number) => {
    //     setTimeout(() => {
    //         console.log('set timeout')
    //     }, milliseconds)
    // }
    //
    // console.log(sum(1, 2, 3))
    // console.log(stringIncludes('Hello', 'helLO'))
    // console.log(getNames([
    //     {one: '1'},
    //     {name: 'boris'},
    //     {two: '2'},
    //     {name: 'hello'}
    // ]))
    //
    // console.log(largestNumbersIndex([111, 22, 3, 4, 5]));
    //
    // useEffect(() => {
    //     (async () => {
    //         console.time('start')
    //         await delay(3000)
    //         console.timeEnd('start')
    //     })()
    // }, [])


    // const obj = {one: '1', two: 'two', three: 'three'}

    // const [jwt, setJwt] = useState('')
    //
    // const getPosts = async () => {
    //     const data = await (await fetch('http://localhost:4000/posts', {
    //         headers: {
    //             authorization: 'Bearer ' + jwt
    //         }
    //     }))
    //         .json()
    //         .catch(error => console.log(error))
    //     console.log(data)
    // }
    //
    // useEffect(() => {
    //
    //     const login = async () => {
    //         const data = await (await fetch('http://localhost:4000/login', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 username: 'boris'
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }))
    //             .json()
    //             .catch(error => console.log(error))
    //
    //         setJwt(data.accessToken)
    //     }
    //     login()
    // }, [])
    //
    // useEffect(() => {
    //     if(jwt) getPosts()
    // }, [jwt])



    return (
        /*@ts-ignore*/
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
