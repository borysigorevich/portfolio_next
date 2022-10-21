import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

import {ResizeEvent} from "leaflet";

const Three = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const {current: mouse} = useRef({
        x: 0,
        y: 0
    })


    let currentTime = Date.now()

    const clock = new THREE.Clock()


    useEffect(() => {

        const gui = new GUI()


        let width = window.innerWidth
        let height = window.innerHeight

        const getMousePosition = (event: MouseEvent) => {
            mouse.x = event.clientX / width - 0.5
            mouse.y = -(event.clientY / height - 0.5)
        }


        const requestFullScreen = () => {
            const fullScreen = document.fullscreenElement || document.webkitFullscreenElement

            if (!fullScreen) {
                if (canvasRef.current?.requestFullscreen) {

                    canvasRef.current?.requestFullscreen()
                } else if (canvasRef.current?.webkitRequestFullscreen!) {
                    canvasRef.current?.webkitRequestFullscreen()
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitExitFullscreen!) {
                    document.webkitExitFullscreen()
                }
            }
        }

        window.addEventListener('mousemove', getMousePosition)
        window.addEventListener('dblclick', requestFullScreen)

        const scene = new THREE.Scene()

        const geometry = new THREE.BoxGeometry(1, 1, 1)

        const positionsArray = new Float32Array([
            0, 0, 0,
            0, 1, 0,
            1, 0, 0,

            0, 1, 0,
            1, 1, 0,
            1, 0, 0,

            0, 0, 0,
            0, 1, 0,
            0, 0, 1,

            0, 1, 0,
            0, 1, 1,
            0, 0, 1,

            0, 0, 0,
            0, 0, 1,
            1, 0, 0,

            0, 0, 1,
            1, 0, 1,
            1, 0, 0,

            1, 0, 0,
            1, 0, 1,
            1, 1, 0,

            1, 1, 0,
            1, 1, 1,
            1, 0, 1,

            0, 1, 1,
            1, 0, 1,
            0, 0, 1,

            1, 0, 1,
            1, 1, 1,
            0, 1, 1,

            0, 1, 0,
            1, 1, 0,
            1, 1, 1,

            0, 1, 0,
            0, 1, 1,
            1, 1, 1,
        ])

        const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
        // const geometry = new THREE.BufferGeometry()
        // geometry.setAttribute('position', positionAttribute)

        const material = new THREE.MeshBasicMaterial({
            color: '#f00',
            wireframe: true
        })

        const mesh = new THREE.Mesh(geometry, material)

        // gui.add(mesh.position, 'y', -3, 3, 0.01)
        gui
            .add(mesh.position, 'y')
            .min(-3)
            .max(3)
            .step(0.1)

        gui
            .add(material, 'wireframe')

        gui
            .addColor(material, 'color')


        // mesh.position.x += 1
        // mesh.position.y += 1
        // mesh.position.z += 1;

        // mesh.rotation.set(0, 3.1, 0)

        // mesh.scale.x = 2

        const camera = new THREE.PerspectiveCamera(75, width / height)
        const controls = new OrbitControls(camera, canvasRef.current!)
        controls.enableDamping = true
        camera.position.z = 3


        const getNewCanvasSizes = (event: any) => {
            width = window.innerWidth
            height = window.innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(width, height)
        }
        // const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
        window.addEventListener('resize', getNewCanvasSizes)
        // camera.position.set(2, 1.2, 4)
        // camera.rotation.set(-0.3, 0.4, 0)

        scene.add(mesh)
        scene.add(camera)

        // const axesHelper = new THREE.AxesHelper(3)
        //
        // scene.add(axesHelper)

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!
        })

        renderer.setSize(width, height)
        renderer.render(scene, camera)

        const tick = () => {

            // const newTime = Date.now()
            // const deltaTime = newTime - currentTime
            // currentTime = newTime
            //
            // mesh.rotation.y += 0.001 * deltaTime
            // const elapsedTime = clock.getElapsedTime()
            // console.log({elapsedTime})
            // console.log(elapsedTime * Math.PI * 2)
            // mesh.rotation.y = elapsedTime * Math.PI * 2
            // mesh.position.y = Math.sin(elapsedTime)
            // camera.position.x = mouse.x * 10
            // camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3
            // camera.position.y = mouse.y * 10
            // camera.position.z = Math.cos(mouse.x * Math.PI * 2) * 3
            // camera.lookAt(mesh.position)
            controls.update()
            renderer.render(scene, camera)


            window.requestAnimationFrame(tick)

        }

        tick()

        return () => {
            window.removeEventListener('mousemove', getMousePosition)
            window.removeEventListener('resize', getNewCanvasSizes)
            window.removeEventListener('dblclick', requestFullScreen)
        }

    }, [])

    return (
        <div>
            <canvas ref={canvasRef}>

            </canvas>
        </div>
    );
};

export default Three;