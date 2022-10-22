import React, {useRef, useEffect} from 'react';
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

const Three15 = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const gui = new GUI()

        const textureLoader = new THREE.TextureLoader()

        const bakedShadowTexture = textureLoader.load('/bakedShadow.jpg')
        const simpleShadowTexture = textureLoader.load('/simpleShadow.jpg')

        let width = window.innerWidth
        let height = window.innerHeight

        const scene = new THREE.Scene()
        const clock = new THREE.Clock()

        const material = new THREE.MeshStandardMaterial({color: '#fff'})

        material.metalness = 0.3
        material.roughness = 0.1

        const planeMaterial = new THREE.MeshStandardMaterial({color: '#fff'})
        planeMaterial.side = THREE.DoubleSide
        planeMaterial.metalness = 0.3
        planeMaterial.roughness = 0.1

        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        const sphereGeometry = new THREE.SphereGeometry(0.6, 25, 25)
        const torusGeometry = new THREE.TorusGeometry(0.4, 0.2, 20, 20)
        const planeGeometry = new THREE.PlaneGeometry(10, 10)

        const box = new THREE.Mesh(boxGeometry, material)
        const sphere = new THREE.Mesh(sphereGeometry, material)
        sphere.castShadow = true
        // sphere.position.x = -3

        const torus = new THREE.Mesh(torusGeometry, material)
        torus.position.x = 3

        const plane = new THREE.Mesh(
            planeGeometry,
            // new THREE.MeshBasicMaterial({map: bakedShadowTexture})
            planeMaterial
        )
        plane.position.y = -0.8
        plane.receiveShadow = true

        plane.rotation.x = Math.PI * 0.5

        const sphereShadow = new THREE.Mesh(
            new THREE.PlaneGeometry(1.5, 1.5),
            new THREE.MeshBasicMaterial({color: '#000', transparent: true, alphaMap: simpleShadowTexture})
        )

        sphereShadow.rotation.x = -Math.PI * 0.5
        sphereShadow.position.y = -0.79

        scene.add(sphereShadow)

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100)
        camera.position.z = 4

        const controls = new OrbitControls(camera, canvasRef.current!)
        controls.enableDamping = true

        const ambientLight = new THREE.AmbientLight('#fff', 0.5)

        const directionalLight = new THREE.DirectionalLight('#00fffc', 0.5)
        directionalLight.lookAt(new THREE.Vector3())
        directionalLight.position.set(2, 2, -1)
        directionalLight.castShadow = true

        directionalLight.shadow.mapSize.width = 1024
        directionalLight.shadow.mapSize.height = 1024

        directionalLight.shadow.camera.near = 0.5
        directionalLight.shadow.camera.far = 8

        directionalLight.shadow.camera.top = 3
        directionalLight.shadow.camera.right = 3
        directionalLight.shadow.camera.bottom = -3
        directionalLight.shadow.camera.left = -3

        gui.add(directionalLight.shadow.camera, 'top').min(1).max(10).step(0.01)
        gui.add(directionalLight.shadow.camera, 'right').min(1).max(10).step(0.01)
        gui.add(directionalLight.shadow.camera, 'bottom').min(-10).max(10).step(0.01)
        gui.add(directionalLight.shadow.camera, 'left').min(-10).max(10).step(0.01)

        const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        directionalLightCameraHelper.visible = false
        scene.add(directionalLightCameraHelper)

        const hemisphereLight = new THREE.HemisphereLight('#f00', '#00f', 0.3)
        const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)

        const pointLight =  new THREE.PointLight('#fff', 0.5)
        pointLight.position.set(1, 0, 1)
        pointLight.castShadow = true
        pointLight.position.y = 2

        pointLight.shadow.camera.near = 1
        pointLight.shadow.camera.far = 6

        pointLight.shadow.mapSize.width = 1024
        pointLight.shadow.mapSize.height = 1024

        const rectAreaLight = new THREE.RectAreaLight('#4e00ff', 2, 4, 4)
        rectAreaLight.position.set(-1.5, 0, 1.5)
        rectAreaLight.lookAt(new THREE.Vector3())

        const spotLight = new THREE.SpotLight('#fff', 0.4, 10, Math.PI * 0.3, 0.25, 1)
        spotLight.position.set(0,2,2)
        spotLight.castShadow = true

        spotLight.shadow.mapSize.width = 1024
        spotLight.shadow.mapSize.height = 1024
        spotLight.shadow.camera.fov = 30
        spotLight.shadow.camera.near = 1
        spotLight.shadow.camera.far = 6

        const spotLightHelper = new THREE.SpotLightHelper(spotLight, '#fff')
        const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
        const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)


        scene.add(sphere, plane, camera)

        // scene.add(ambientLight, directionalLight, hemisphereLight, pointLight, rectAreaLight )
        // spotLight.target.position.x = -1.5
        // scene.add(spotLight, spotLight.target)
        // scene.add( spotLight, spotLight.target, spotLightCameraHelper)
        scene.add(pointLight, ambientLight)

        window.requestAnimationFrame(() => {
            spotLightHelper.update()
        })

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!
        })
        renderer.setSize(width, height)
        renderer.shadowMap.enabled = false
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
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

            const elapsedTime = clock.getElapsedTime()

            box.rotation.x = elapsedTime * 0.3
            box.rotation.y = elapsedTime * 0.3

            torus.rotation.x = elapsedTime * 0.3
            torus.rotation.y = elapsedTime * 0.3
            console.log({
                sin: Math.sin(elapsedTime),
                cos: Math.cos(elapsedTime)
            })
            sphere.position.x = Math.sin(elapsedTime) * 1.5
            sphere.position.z = Math.cos(elapsedTime) * 1.5
            sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

            sphereShadow.position.x = sphere.position.x
            sphereShadow.position.z = sphere.position.z

            sphereShadow.material.opacity = 1 - sphere.position.y

            controls.update()
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

export default Three15;