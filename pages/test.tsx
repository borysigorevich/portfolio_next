import React, {ChangeEvent, useState, useRef, useEffect} from 'react';
import * as tr from 'three'

import {Box} from '@common'

import {useDebounce} from '@hooks'

const Test = () => {

    const canvasRef = useRef<any>(null)

    useEffect(() => {

        let intervalId: number

        // if (canvasRef.current) {
            const scene = new tr.Scene()

            const geometry = new tr.BoxGeometry(1, 1, 1)
            const material = new tr.MeshBasicMaterial({color: 'red'})

            const mesh = new tr.Mesh(geometry, material)

            const camera = new tr.PerspectiveCamera(75, 800 / 600)
            camera.position.z = 3

            scene.add(mesh)
            scene.add(camera)

            const renderer = new tr.WebGL1Renderer({
                canvas: canvasRef.current
            })

            mesh.rotation.x = 5
            mesh.rotation.y = 5
            mesh.rotation.z = 15

            // intervalId = window.setInterval(() => {
            //     console.log('here')
            //     mesh.rotation.x += 0.01
            //     mesh.rotation.y += 0.01
            //     mesh.rotation.z += 0.1
            // }, 100)

            renderer.setSize(800, 600)
            renderer.render(scene, camera)


        // }
    }, [])


    const [input, setInput] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)
    const handleDebounce = () => console.log('hello world')

    useDebounce(handleDebounce, 500, [input])

    type Fn = <T>(value: T) => void

    const fn: Fn = (value) => {
        console.log(value)
    }

    const fn1: <T>(value: T) => T = (value) => {
        return value
    }

    const fn2 = <T, >(value: T) => {

    }

    const powerOfTwo = (number: number) => {
        if (number < 1) return false
        return (number & (number - 1)) === 0
    }

    const tower = (number: number, from: string, to: string, using: string) => {
        if (number === 1) {
            console.log(`Move Disk One from ${from} to ${to}`)
            return
        }
        tower(number - 1, from, using, to)
        console.log(`Move Disk ${number} from ${from} to ${to}`)
        tower(number - 1, using, to, from)
    }

    const inc = (() => {
        let counter = 0

        return () => {
            counter++
            return counter
        }
    })()

    const sortByFrequency = (arr: string[]) => {
        let obj: Record<string, number> = {}

        arr.forEach(value => {
            if (obj[value]) {
                obj[value] += 1
            } else {
                obj[value] = 1
            }
        })

        const entries = Object.entries(obj).sort((a, b) => b[1] - a[1])

        return entries.reduce((result: string[], arr) => {
            result.push(arr[0])
            return result
        }, [])
    }

    const sum = (value: number) => {
        return (value1: number) => {
            return value + value1
        }
    }

    const sumNew = (value: number) => {
        let result = value
        const addMore = (add: number | undefined) => {
            result += add || 0
            return add ? addMore : result
        }
        return addMore
    }


    // console.log(sumNew(1)(1)(3)())
    // console.log('*at'.replace('*', ''))

    const calculate = (fn: (a: number, b: number) => number) => {
        return (value1: number) => {
            return (value2: number) => {
                return fn(value1, value2)
            }
        }
    }

    // console.log(calculate((a, b) => {
    //     return a + b
    // })(5)(5))

    const multiplyByTwo = (...args: number[]) => {
        return args.map(value => value * 2)
    }

    const arr = [1, 2, 3]
    // console.log(multiplyByTwo(...arr))
    // console.log(arr.sort((a, b) => b - 1))

    const brackets = (str: string) => {
        let open: number = 0
        let close: number = 0
        for (const strElement of str) {
            if (strElement === '(') open++
            else if (strElement === ')') close++
        }

        return open === close
    }


    type TestObject = {
        [key: string]: TestObject | number
    }

    const get = (keySequence: string, object: TestObject) => {
        const keys = keySequence.split('.')
        let tempObj: TestObject | number = object

        console.log({keys, tempObj})

        for (let i = 0; i < keys.length; i++) {
            // if (typeof tempObj[keys[i]] !== 'number') {
            //     tempObj = tempObj[keys[i]] as {[key: string]: TestObject}
            // } else {
            //     return tempObj[keys[i]]
            // }
            // @ts-ignore
            if (tempObj[keys[i]]) {
                // @ts-ignore
                tempObj = tempObj[keys[i]]
            } else {
                return undefined
            }

        }
        return tempObj
    }

    type Array = { [key: string]: string }[]


    const getArrByKey = <V extends { [key: string]: string }, K extends keyof V>(arr: V[], key: K) => {
        return arr.map(value => ({[key]: value[key]}))
    }

    console.log(getArrByKey([{one: 'one', two: 'two'}, {one: 'one', two: '22'}], 'two'))

    // console.log(get('red.blue.yellow', {
    //     red: {
    //         blue: {
    //             yellow: 2
    //         }
    //     }
    // }))


    return (
        <Box sx={{
            // display: 'grid',
            // bgcolor: 'red',
            // color: 'white',
            // placeItems: 'center',
            // minHeight: '100vh'
        }}>

            {/*<input type="text" onChange={handleChange} value={input}/>*/}

            {/*<Box sx={{*/}
            {/*    width: '40px',*/}
            {/*    height: '40px',*/}
            {/*    borderRight: '20px solid teal',*/}
            {/*    borderLeft: '20px solid teal',*/}
            {/*    // borderTop: '20px solid teal',*/}
            {/*    borderBottom: '20px solid transparent'*/}
            {/*}}/>*/}

            {/*<Box component={'label'} sx={{*/}
            {/*    // bgcolor: 'red',*/}
            {/*    width: '16px',*/}
            {/*    height: '16px',*/}
            {/*    border: 1,*/}
            {/*    borderRadius: '50%',*/}
            {/*    borderColor: '#ffd700',*/}
            {/*    display: 'flex',*/}
            {/*    position: 'relative',*/}
            {/*    alignItems: 'center',*/}
            {/*    justifyContent: 'center',*/}

            {/*    'input': {*/}
            {/*        appearance: 'none',*/}

            {/*        '::before': {*/}
            {/*            content: '""',*/}
            {/*            width: '8px',*/}
            {/*            height: '8px',*/}
            {/*            borderRadius: '50%',*/}
            {/*            position: 'absolute',*/}
            {/*            bgcolor: '#ffd700',*/}
            {/*            top: 'calc(50% - 4px)',*/}
            {/*            left: 'calc(50% - 4px)',*/}
            {/*            transform: 'scale(0)',*/}
            {/*            transition: '.3s'*/}
            {/*        },*/}

            {/*        ':checked::before': {*/}
            {/*            transform: 'scale(1)'*/}
            {/*        }*/}
            {/*    }*/}
            {/*}}>*/}

            {/*    <input type="checkbox"/>*/}
            {/*</Box>*/}

            {/*<a href="/">HOME</a>*/}
            <canvas ref={canvasRef}>

            </canvas>
        </Box>
    );
};

export default Test;