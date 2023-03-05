import React, { useEffect, useRef } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import * as THREE from 'three'
import GUI from 'lil-gui'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            three: true
        }
    }
}
const Three13 = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    console.log(props.three)
    useEffect(() => {

        const gui = new GUI()

        const fontLoader = new FontLoader()
        const textureLoader = new THREE.TextureLoader()

        const matcap = textureLoader.load('/matcaps/1.png')

        fontLoader.load(
            '/fonts/helvetiker_regular.typeface.json',
            (font) => {
                console.log(font)
                const textGeometry = new TextGeometry(
                    'Denis Penis',
                    {
                        font,
                        size: 0.5,
                        height: 0.2,
                        curveSegments: 6,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 4,
                    },
                )

                // textGeometry.computeBoundingBox()
                //
                // textGeometry.translate(
                //     - (textGeometry.boundingBox!.max.x - 0.02) * 0.5,
                //     - (textGeometry.boundingBox!.max.y - 0.02) * 0.5,
                //     - (textGeometry.boundingBox!.max.z - 0.03) * 0.5,
                // )

                textGeometry.center()

                const text = new THREE.Mesh(textGeometry, material)

                scene.add(text)
            })

        let width = window.innerWidth
        let height = window.innerHeight

        const axesHelper = new THREE.AxesHelper()

        const scene = new THREE.Scene()

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        // const material = new THREE.MeshStandardMaterial()
        const material = new THREE.MeshMatcapMaterial({
            matcap,
        })
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

        console.time('donuts')

        for (let i = 0; i < 1500; i++) {


            const donut = new THREE.Mesh(donutGeometry, material)

            donut.position.x = (Math.random() - 0.5) * 35
            donut.position.y = (Math.random() - 0.5) * 35
            donut.position.z = (Math.random() - 0.5) * 35

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            donut.rotation.z = Math.random() * Math.PI

            const scale = Math.random() + 0.2

            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }

        console.timeEnd('donuts')

        // material.wireframe = true

        const box = new THREE.Mesh(geometry, material)

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100)
        camera.position.z = 3

        const ambientLight = new THREE.AmbientLight('#fff', 1)

        scene.add(camera, ambientLight)

        const controls = new OrbitControls(camera, canvasRef.current!)
        controls.enableDamping = true


        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!,
        })

        renderer.setSize(width, height)
        renderer.render(scene, camera)

        const getNewSizes = (event: any) => {
            width = window.innerWidth
            height = window.innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(width, height)
        }

        window.addEventListener('resize', getNewSizes)

        const tick = () => {

            controls.update()
            renderer.render(scene, camera)

            window.requestAnimationFrame(tick)
        }

        tick()

        return () => window.removeEventListener('resize', getNewSizes)


    }, [])

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Three13;