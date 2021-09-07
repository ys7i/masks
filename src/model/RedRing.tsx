/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Torus002: THREE.Mesh;
  };
  materials: {
    ['Material.007']: THREE.MeshStandardMaterial;
  };
};

// eslint-disable-next-line no-undef
export default function RedRing(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>({} as Group);
  useFrame(() => {
    group.current.rotation.x += 0.01;
  });
  const { nodes, materials } = useGLTF('/redRing.gltf') as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus002.geometry}
        material={materials['Material.007']}
        scale={[1.3, 0.5, 0.5]}
      />
    </group>
  );
}

useGLTF.preload('/redRing.gltf');
