import React, {useRef, useEffect} from 'react';
import * as THREE from 'three'

import GUI from 'lil-gui'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const Three11 = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {

        const gui = new GUI()

        const clock = new THREE.Clock()

        let width = window.innerWidth
        let height = window.innerHeight

        const scene = new THREE.Scene()

        const loadingManager = new THREE.LoadingManager()
        const textureLoader = new THREE.TextureLoader(loadingManager)
        const cubeTextureLoader = new THREE.CubeTextureLoader()

        loadingManager.onStart = () => {
            console.log('on start')
        }

        const image = new Image()
        image.src = '/door/color.jpg'
        // const texture = new THREE.Texture(image)
        const colorTexture = textureLoader.load('/door/color.jpg')
        // const colorTexture = textureLoader.load('/checkerboard-8x8.png')
        const normalTexture = textureLoader.load('/door/normal.jpg')
        const alphaTexture = textureLoader.load('/door/alpha.jpg')
        const ambientOcclusionTexture = textureLoader.load('/door/ambientOcclusion.jpg')
        const heightTexture = textureLoader.load('/door/height.jpg')
        const metalnessTexture = textureLoader.load('/door/metalness.jpg')
        const roughnessTexture = textureLoader.load('/door/roughness.jpg')
        const gradient = textureLoader.load('/gradients/5.jpg')
        const matcap = textureLoader.load('/matcaps/4.png')

        const environmentTexture = cubeTextureLoader.load([
            '/environmentMaps/0/px.jpg',
            '/environmentMaps/0/nx.jpg',
            '/environmentMaps/0/py.jpg',
            '/environmentMaps/0/ny.jpg',
            '/environmentMaps/0/pz.jpg',
            '/environmentMaps/0/nz.jpg'
        ])

        // environmentTexture.generateMipmaps = false
        // environmentTexture.minFilter = THREE.NearestFilter
        // environmentTexture.magFilter = THREE.NearestFilter

        // matcaps.generateMipmaps = false
        // matcaps.magFilter = THREE.NearestFilter

        // image.onload = () => {
        //     colorTexture.needsUpdate = true
        // }

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        // const material = new THREE.MeshBasicMaterial({map: colorTexture})

        // const material = new THREE.MeshBasicMaterial({map: gradient})
        //
        // material.opacity = 0.5
        // material.transparent = true

        // material.side = THREE.DoubleSide
        // material.alphaMap = some alpha texture

        // const material = new THREE.MeshNormalMaterial()
        // material.flatShading = true

        // const material = new THREE.MeshMatcapMaterial({matcap})
        // const material = new THREE.MeshLambertMaterial()
        // const material = new THREE.MeshPhongMaterial()
        //
        // material.shininess = 50
        // material.specular = new THREE.Color('#0f0')

        // const material = new THREE.MeshToonMaterial({gradientMap: gradient})
        const material = new THREE.MeshStandardMaterial()
        material.metalness = 0.7
        material.roughness = 0.2

        material.envMap = environmentTexture



        material.side = THREE.DoubleSide

        // material.aoMap = ambientOcclusionTexture
        // material.aoMapIntensity = 1
        // material.displacementMap = heightTexture
        // material.displacementScale = 0.05
        //
        // material.metalnessMap = metalnessTexture
        // material.roughnessMap = roughnessTexture
        // material.normalMap = normalTexture
        // material.transparent = true
        // material.alphaMap = alphaTexture

        gui
            .add(material, 'metalness')
            .min(0)
            .max(1)
            .step(0.01)

        gui
            .add(material, 'roughness')
            .min(0)
            .max(1)
            .step(0.01)


        gui
            .add(material, 'aoMapIntensity')
            .min(0)
            .max(10)
            .step(0.01)

        gui
            .add(material, 'wireframe')

        gui
            .add(material, 'displacementScale')
            .min(0)
            .max(1)
            .step(0.01)
        // const material = new THREE.MeshDepthMaterial()

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 64, 64),
            material
        )

        sphere.position.set(3, 0, 0)

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 10, 10),
            material
        )

        console.log(plane)

        plane.position.set(0, 0, 0)

        gui
            .add(plane.geometry.parameters, 'widthSegments')
            .min(0)
            .max(100)
            .step(0.5)

        gui
            .add(plane.geometry.parameters, 'heightSegments')
            .min(0)
            .max(100)
            .step(0.5)

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(0.5, 0.2, 16, 32),
            material
        )

        torus.position.set(-3, 0, 0)

        plane.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
        )

        sphere.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
        )

        torus.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
        )

        console.log(plane.geometry.attributes)

        // colorTexture.repeat.x = 2
        // colorTexture.repeat.y = 3
        //
        // colorTexture.wrapS = THREE.MirroredRepeatWrapping
        // colorTexture.wrapT = THREE.MirroredRepeatWrapping
        //
        // colorTexture.offset.x = 0.5
        // colorTexture.center.x = 0.5
        // colorTexture.center.y = 0.5
        //
        // colorTexture.rotation = Math.PI * 0.1

        // colorTexture.minFilter = THREE.LinearFilter

        //when we use NearestFilter we can disable mipMapping
        colorTexture.generateMipmaps = false
        colorTexture.magFilter = THREE.NearestFilter


        const mesh = new THREE.Mesh(geometry, material)

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100)
        camera.position.z = 3

        const controls = new OrbitControls(camera, canvasRef.current!)
        controls.enableDamping = true

        scene.add(sphere, plane, torus, camera)

        const ambientLight = new THREE.AmbientLight('#fff', 0.5)
        gui
            .add(ambientLight, 'intensity')
            .min(0)
            .max(100)
            .step(0.5)

        const pointLight = new THREE.PointLight('#fff', 0.5)

        pointLight.position.set(0, 0, 4)

        scene.add(ambientLight, pointLight)

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!,
        })

        renderer.setSize(width, height)
        renderer.render(scene, camera)

        const getCanvasNewSize = (event: any) => {
            width = window.innerWidth
            height = window.innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(width, height)
        }

        window.addEventListener('resize', getCanvasNewSize)

        const tick = () => {

            const elapsedTime = clock.getElapsedTime()

            sphere.rotation.y = elapsedTime * 0.1
            plane.rotation.y = elapsedTime * 0.1
            torus.rotation.y = elapsedTime * 0.1

            controls.update()
            renderer.render(scene, camera)

            window.requestAnimationFrame(tick)

        }

        tick()

        return () => window.removeEventListener('resize', getCanvasNewSize)

    }, [])

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Three11;