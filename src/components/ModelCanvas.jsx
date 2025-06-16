import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'

function Model() {
  const gltf = useGLTF('/scene.gltf') // Put the unzipped GLTF in /public
  return (
    <Center>
      <primitive object={gltf.scene} />
    </Center>
  )
}

export default function ModelCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Model />
      <OrbitControls />
    </Canvas>
  )
}
