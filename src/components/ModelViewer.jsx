import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Center } from '@react-three/drei';

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
};

const ModelViewer = ({ modelPath }) => {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 130], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <Suspense fallback={null}>
          <Model modelPath={modelPath} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
