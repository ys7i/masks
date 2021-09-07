import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function RedMask(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/redMask.gltf');
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.2, 0, 1]} scale={[4, 1, 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials['Material.002']}
        />
        <lineSegments
          geometry={nodes.Plane002_1.geometry}
          material={materials['Material.002']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/redMask.gltf');
