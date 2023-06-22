import React, { useRef, useEffect, useState } from 'react'

import { Group } from 'three'
import { Canvas } from '@react-three/fiber'
import { PresentationControls, Float, useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

import { Box } from '@common'

import * as styles from './LogoStyles'

const LetterB = () => {
    const [isRendered, setIsRendered] = useState(false)

    const { scale } = useSpring({
        scale: isRendered ? 5 : 0,
        delay: 1000,
        config: {
            duration: 1000,
        },
    })

    const logo = useGLTF('/letter.glb')

    const logoRef = useRef<Group | null>(null)

    useEffect(() => {
        setIsRendered(true)
    }, [])

    return (
        // <PresentationControls
        //     config={{ mass: 2, tension: 200 }}
        //     snap={{ mass: 4, tension: 200 }}
        //     rotation={[-0.3, 0, 0]}
        //     polar={[-Math.PI / 3, Math.PI / 3]}
        //     azimuth={[-Math.PI / 1.8, Math.PI / 2]}
        // >
            <>
                {/*@ts-ignore*/}
                <Float speed={4}>
                    <animated.group
                        scale={scale}
                        position={[-0.7, -1.2, 0]}
                    >
                        <primitive
                            ref={logoRef}
                            object={logo.scene}
                        />
                    </animated.group>

                </Float>
            </>
        // </PresentationControls>
    )
}

const Logo = () => {

    return (
        /*@ts-ignore*/
        <Box sx={styles.Logo}>
            <Canvas
                camera={{
                    near: 0.01,
                    far: 50,
                    fov: 45,
                    position: [0, 2, 5],
                }}
            >
                <LetterB />
                {/*<OrbitControls*/}
                {/*    maxPolarAngle={Math.PI / 2}*/}
                {/*    minPolarAngle={Math.PI / 2}*/}
                {/*    maxAzimuthAngle={7}*/}
                {/*    minAzimuthAngle={6}*/}
                {/*    enableZoom={false}*/}
                {/*/>*/}
                <ambientLight intensity={0.5} />
                <pointLight intensity={1} position={[0, 2, 2]} />
            </Canvas>
        </Box>
    )
}

export default Logo