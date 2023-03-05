import React, { useRef, useEffect, useState } from 'react'

import { Group } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PresentationControls, Float, Center, useMatcapTexture, useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

import { Box } from '@common'

import * as styles from './LogoStyles'

const LetterB = () => {
    const [isRendered, setIsRendered] = useState(false)

    const { scale } = useSpring({
        scale: isRendered ? 5 : 0,
        delay: 500,
        config: {
            duration: 1000,
        },
    })

    // console.log(props)
    const [matcapTexture] = useMatcapTexture('CAE24E_6C9A23_A3C737_B3D43C', 256)
    // @ts-ignore
    // const logo = useGLTF('/react-logo.gltf')
    const logo = useGLTF('/letter.glb')

    const logoRef = useRef<Group | null>(null)

    useEffect(() => {
        setIsRendered(true)
    }, [])

    // if (logo) {
    // @ts-ignore
    // logo.scene.children[0].children.forEach(mesh => mesh.material.color = new Color('#61dbfb'))
    // console.log(logo)
    // @ts-ignore
    // logo.materials.default.color = new Color('#61dbfb')
    // }

    console.log(scale)

    return (
        <PresentationControls
            config={{ mass: 2, tension: 200 }}
            snap={{ mass: 4, tension: 200 }}
            rotation={[-0.3, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.8, Math.PI / 2]}
        >
            <>
                {/*<Text3D*/}
                {/*    rotation={[0, 0, -0.5]}*/}
                {/*    font='/fonts/helvetiker_regular.typeface.json'*/}
                {/*    scale={3}*/}
                {/*    size={1}*/}
                {/*    height={0.2}*/}
                {/*    curveSegments={12}*/}
                {/*    bevelEnabled*/}
                {/*    bevelThickness={0.02}*/}
                {/*    bevelSize={0.02}*/}
                {/*    bevelOffset={0}*/}
                {/*    bevelSegments={5}*/}
                {/*>*/}
                {/*    B*/}
                {/*    /!*<meshNormalMaterial />*!/*/}
                {/*    /!*<meshMatcapMaterial matcap={matcapTexture} />*!/*/}
                {/*    <meshBasicMaterial*/}
                {/*        color='#ffd700'*/}
                {/*    />*/}
                {/*</Text3D>*/}
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

                    {/*<animated.mesh scale={scale} onClick={() => setActive(state => !state)}>*/}
                    {/*    <boxGeometry args={[2,2,2]}/>*/}
                    {/*    <meshNormalMaterial/>*/}
                    {/*</animated.mesh>*/}

                </Float>
                {/*<group>*/}
                {/*    <mesh*/}
                {/*        geometry={nodes?.Scene}*/}
                {/*    >*/}
                {/*        <meshBasicMaterial />*/}
                {/*    </mesh>*/}
                {/*</group>*/}
            </>
        </PresentationControls>
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