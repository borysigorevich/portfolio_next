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

const Three17 = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {

        const gui = new GUI()

        const clock = new THREE.Clock()

        const textureLoader = new THREE.TextureLoader()

        //BRICKS TEXTURE
        const bricksAmbientTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
        const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
        const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
        const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

        //DOOR TEXTURE
        const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
        const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
        const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
        const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
        const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
        const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
        const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

        //GRASS TEXTURE
        const grassAmbientTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
        const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
        const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
        const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

        // grassAmbientTexture.repeat.set(8, 8)
        // grassColorTexture.repeat.set(8, 8)
        // grassNormalTexture.repeat.set(8, 8)
        // grassRoughnessTexture.repeat.set(8, 8)

        grassAmbientTexture.repeat.set(8, 8)
        grassColorTexture.repeat.set(8, 8)
        grassNormalTexture.repeat.set(8, 8)
        grassRoughnessTexture.repeat.set(8, 8)

        grassAmbientTexture.wrapS = THREE.RepeatWrapping
        grassColorTexture.wrapS = THREE.RepeatWrapping
        grassNormalTexture.wrapS = THREE.RepeatWrapping
        grassRoughnessTexture.wrapS = THREE.RepeatWrapping

        grassAmbientTexture.wrapT = THREE.RepeatWrapping
        grassColorTexture.wrapT = THREE.RepeatWrapping
        grassNormalTexture.wrapT = THREE.RepeatWrapping
        grassRoughnessTexture.wrapT = THREE.RepeatWrapping


        let width = innerWidth
        let height = innerHeight


        //SCENE
        const scene = new THREE.Scene()

        const fog = new THREE.Fog('#262837', 1, 15)

        //MATERIALS
        const sphereMaterial = new THREE.MeshStandardMaterial({color: '#fff'})
        // const sphereMaterial = new THREE.MeshBasicMaterial({color: '#fff'})
        const planeMaterial = new THREE.MeshStandardMaterial({
            map: grassColorTexture,
            aoMap: grassAmbientTexture,
            normalMap: grassNormalTexture,
            roughnessMap: grassRoughnessTexture,
        })

        planeMaterial.side = THREE.DoubleSide

        //GROUPS
        const house = new THREE.Group()

        const graves = new THREE.Group()

        //WALLS
        const walls = new THREE.Mesh(
            new THREE.BoxGeometry(4, 2.5, 4),
            new THREE.MeshStandardMaterial({
                map: bricksColorTexture,
                aoMap: bricksAmbientTexture,
                normalMap: bricksNormalTexture,
                roughnessMap: bricksRoughnessTexture,
            })
        )

        walls.castShadow = true

        walls.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))

        house.add(walls)

        walls.position.y = walls.geometry.parameters.height * 0.5 + 0.01

        //ROOF

        const roof = new THREE.Mesh(
            new THREE.ConeGeometry(3.5, 2, 4),
            new THREE.MeshStandardMaterial({color: '#b35f45'})
        )
        roof.position.y = walls.geometry.parameters.height + roof.geometry.parameters.height * 0.5 + 0.01
        // roof.position.y = 3.65

        roof.rotation.y = Math.PI * 0.25

        // gui.add(roof.rotation, 'y').min(-5).max(5).step(0.01)
        // gui.add(roof.position, 'x').min(-5).max(5).step(0.01)
        // gui.add(roof.position, 'y').min(-5).max(5).step(0.01)
        // gui.add(roof.position, 'z').min(-5).max(5).step(0.01)

        house.add(roof)

        //DOOR
        const door = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 100, 100),
            new THREE.MeshStandardMaterial({
                map: doorColorTexture,
                transparent: true,
                alphaMap: doorAlphaTexture,
                aoMap: doorAmbientTexture,
                displacementMap: doorHeightTexture,
                displacementScale: 0.1,
                normalMap: doorNormalTexture,
                metalnessMap: doorMetalnessTexture,
                roughnessMap: doorRoughnessTexture,

            })
        )

        door.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
        )

        door.position.y = 0.92
        door.position.z = 1.98

        house.add(door)

        //bushes
        const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
        const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})

        const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
        bush1.scale.set(0.5, 0.5, 0.5)
        bush1.position.set(0.8, 0.2, 2.2)

        const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
        bush2.scale.set(0.25, 0.25, 0.25)
        bush2.position.set(1.4, 0.1, 2.1)

        const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
        bush3.scale.set(0.4, 0.4, 0.4)
        bush3.position.set(-0.8, 0.1, 2.2)

        const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
        bush4.scale.set(0.15, 0.15, 0.15)
        bush4.position.set(-1, 0.05, 2.6)

        house.add(bush1, bush2, bush3, bush4)

        bush1.castShadow = true
        bush2.castShadow = true
        bush3.castShadow = true
        bush4.castShadow = true

        //GRAVES
        const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
        const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'})

        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2

            const radius = 3.5 + Math.random() * 6
            const x = Math.sin(angle) * radius
            const z = Math.cos(angle) * radius

            const grave = new THREE.Mesh(graveGeometry, graveMaterial)

            grave.position.set(x, 0.3, z)
            grave.rotation.y = (Math.random() - 0.5) * 0.4
            grave.rotation.z = (Math.random() - 0.5) * 0.4

            graves.add(grave)
            grave.castShadow = true
        }

        //GEOMETRIES
        const sphereGeometry = new THREE.SphereGeometry(1, 25, 25)
        const planeGeometry = new THREE.PlaneGeometry(20, 20)

        //MESHES
        // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        // sphere.position.y = 5
        // sphere.position.x = 5

        // house.add(sphere)

        const plane = new THREE.Mesh(planeGeometry, planeMaterial)

        plane.receiveShadow = true

        plane.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2)
        )

        plane.rotation.x = -(Math.PI * 0.5)

        //CAMERA
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100)
        camera.position.y = 1
        camera.position.z = 4

        const controls = new OrbitControls(camera, canvasRef.current!)
        controls.enableDamping = true

        //LIGHTS
        const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
        const directionalLight = new THREE.DirectionalLight('#b9d5ff', 0.12)

        //DOOR LIGHT
        const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
        doorLight.position.set(0, 2.2, 2.7)

        house.add(doorLight)

        directionalLight.castShadow = true
        doorLight.castShadow = true

        //GHOSTS

        const ghost1 = new THREE.PointLight('#f0f', 2, 3)
        const ghost2 = new THREE.PointLight('#ff0', 2, 3)
        const ghost3 = new THREE.PointLight('#0ff', 2, 3)

        ghost1.castShadow = true
        ghost2.castShadow = true
        ghost3.castShadow = true

        scene.add(ghost1, ghost2, ghost3)

        //ADD TO SCENE
        scene.add(plane, camera)
        scene.add(ambientLight, directionalLight)
        scene.add(house, graves)
        scene.fog = fog


        //RENDERER
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!
        })
        renderer.setSize(width, height)
        renderer.render(scene, camera)
        renderer.setClearColor('#262837')
        renderer.shadowMap.enabled = true

        const getNewSize = () => {
            width = innerWidth
            height = innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(width, height)
        }

        window.addEventListener('resize', getNewSize)

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            const ghostAngle1 = elapsedTime * 0.5

            ghost1.position.x = Math.sin(ghostAngle1) * 4
            ghost1.position.y = Math.sin(ghostAngle1 * 3)
            ghost1.position.z = Math.cos(ghostAngle1) * 4

            const ghostAngle2 = elapsedTime * -0.2

            ghost2.position.x = Math.sin(ghostAngle2) * 5
            ghost2.position.y = Math.sin(ghostAngle2 * 4) + Math.sin(ghostAngle2 * 2.5)
            ghost2.position.z = Math.cos(ghostAngle2) * 5

            const ghostAngle3 = elapsedTime * -0.18

            ghost3.position.x = Math.cos(ghostAngle3) * (7 + Math.sin(elapsedTime * 0.32))
            ghost3.position.z = Math.sin(ghostAngle3) * (7 + Math.sin(elapsedTime * 0.5))
            ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2)

            controls.update()
            renderer.render(scene, camera)

            window.requestAnimationFrame(tick)
        }

        tick()

        return () => window.removeEventListener('resize', getNewSize)

    }, [])

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Three17;