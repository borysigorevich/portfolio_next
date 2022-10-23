import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import GUI from 'lil-gui'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

export const getServerSideProps = async () => {
    return {
        props: {
            three: true
        }
    }
}

const Three18 = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const gui = new GUI()
        const clock = new THREE.Clock()

        const textureLoader = new THREE.TextureLoader()

        const particleTexture = textureLoader.load('/particles/2.png')

        let width = window.innerWidth
        let height = window.innerHeight

        const scene = new THREE.Scene()

        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial()
        )

        // const particlesGeometry = new THREE.SphereGeometry(1, 36, 36)
        const particlesGeometry = new THREE.BufferGeometry()
        const count = 20000

        const position = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count * 3; i++) {
            position[i] = (Math.random() - 0.5) * 15
            colors[i] = Math.random()
        }

        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3))
        particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            alphaMap: particleTexture,
            transparent: true,
            // color: '#f8c',
            // alphaTest: 0.01,
            // depthTest: false,
            depthWrite: false,
            // blending: THREE.AdditiveBlending,
            vertexColors: true
        })

        //POINTS
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100)
        camera.position.z = 3

        const controls = new OrbitControls(camera, canvasRef.current!)
        controls.enableDamping = true

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!
        })

        const ambientLight = new THREE.AmbientLight('#fff', 0.5)
        const directionalLight = new THREE.DirectionalLight('#fff', 0.5)

        scene.add(particles, camera, ambientLight, directionalLight)

        renderer.setSize(width, height)
        renderer.render(scene, camera)

        const getNewSize = () => {
            width = window.innerWidth
            height = window.innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(width, height)
        }

        window.addEventListener('resize', getNewSize)

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            controls.update()

            for (let i = 0; i < count; i++) {
                const i3 = i * 3

                const x = particlesGeometry.attributes.position.array[i3 + 0]
                // @ts-ignore
                particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
            }

            particlesGeometry.attributes.position.needsUpdate = true

            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }
        tick()

    }, [])

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Three18;