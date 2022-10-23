import React, {useEffect, useRef} from 'react';

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import GUI from 'lil-gui'

export const getServerSideProps = async () => {
    return {
        props: {
            three: true
        }
    }
}

const Three19 = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const gui = new GUI()
        const clock = new THREE.Clock()
        const textureLoader = new THREE.TextureLoader()

        const particlesTexture = textureLoader.load('/particles/11.png')

        let width = window.innerWidth
        let height = window.innerHeight

        const scene = new THREE.Scene()

        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial()
        )

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100)
        camera.position.z = 4

        const controls = new OrbitControls(camera, canvasRef.current!)
        controls.enableDamping = true

        scene.add(camera)

        const parameters = {
            count: 175000,
            size: 0.02,
            radius: 7,
            branches: 5,
            spin: 1,
            randomness: 0.1,
            randomnessPower: 3,
            insideColor: '#ff6030',
            outsideColor: '#1b3984'
        }

        let particlesGeometry: THREE.BufferGeometry
        let particlesMaterial: THREE.PointsMaterial
        let particles: THREE.Points

        const generateGalaxy = () => {
            console.log(particles)
            if (particles) {
                console.log('if')
                particlesGeometry.dispose()
                particlesMaterial.dispose()
                scene.remove(particles)
            }

            particlesGeometry = new THREE.BufferGeometry()
            particlesMaterial = new THREE.PointsMaterial({
                size: parameters.size,
                sizeAttenuation: true,
                depthWrite: false,
                vertexColors: true,
                alphaMap: particlesTexture,
                transparent: true,
                blending: THREE.AdditiveBlending,
            })

            const position = new Float32Array(parameters.count * 3)
            const color = new Float32Array(parameters.count * 3)

            const colorInside = new THREE.Color(parameters.insideColor)
            const colorOutside = new THREE.Color(parameters.outsideColor)

            for (let i = 0; i < parameters.count; i++) {

                const i3 = i * 3

                const radius = parameters.radius * Math.random()
                const spinAngle = parameters.spin * radius
                const branchesAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

                if (i < 20) {
                    console.log({
                        branchesAngle,
                        sin: Math.sin(branchesAngle) * radius,
                        cos: Math.cos(branchesAngle) * radius
                    })
                }


                // const randomX = (Math.random() - 0.5) * parameters.randomness
                // const randomY = (Math.random() - 0.5) * parameters.randomness
                // const randomZ = (Math.random() - 0.5) * parameters.randomness

                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

                position[i3] = Math.sin(branchesAngle + spinAngle) * radius + randomX
                position[i3 + 1] = randomY
                position[i3 + 2] = Math.cos(branchesAngle + spinAngle) * radius + randomZ

                const mixedColor = colorInside.clone()
                mixedColor.lerp(colorOutside, radius / parameters.radius)

                color[i3] = mixedColor.r
                color[i3 + 1] = mixedColor.g
                color[i3 + 2] = mixedColor.b

                // color[i3] = Math.random()
                // color[i3 + 1] = Math.random()
                // color[i3 + 2] = Math.random()
            }


            particlesGeometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(position, 3)
            )

            particlesGeometry.setAttribute(
                'color',
                new THREE.Float32BufferAttribute(color, 3)
            )

            particles = new THREE.Points(particlesGeometry, particlesMaterial)

            scene.add(particles)
        }

        gui.add(parameters, 'count').min(0).max(250000).step(5).onFinishChange(generateGalaxy)
        gui.add(parameters, 'size').min(0).max(5).step(0.01).onFinishChange(generateGalaxy)
        gui.add(parameters, 'radius').min(1).max(15).step(0.5).onFinishChange(generateGalaxy)
        gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
        gui.add(parameters, 'spin').min(-5).max(5).step(0.01).onFinishChange(generateGalaxy)
        gui.add(parameters, 'randomness').min(0).max(4).step(0.01).onFinishChange(generateGalaxy)
        gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.1).onFinishChange(generateGalaxy)
        gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
        gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

        generateGalaxy()

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!,
            antialias: true,
        })
        renderer.setSize(width, height)
        renderer.render(scene, camera)

        const getNewSize = () => {
            width = window.innerWidth
            height = window.innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
            renderer.setSize(width, height)
        }

        window.addEventListener('resize', getNewSize)

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            controls.update()

            renderer.render(scene, camera)

            window.requestAnimationFrame(tick)
        }

        tick()

        return () => window.removeEventListener('resize', getNewSize)
    })

    return (
        <div>
            <canvas ref={canvasRef}>

            </canvas>
        </div>
    );
};

export default Three19;