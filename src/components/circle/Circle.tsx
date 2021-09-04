/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { Suspense } from 'react';
import { MaskColor } from '../../types/situation';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type Props = {
  color: MaskColor;
  size: number;
};
const Circle: React.FC<Props> = ({ color, size }) => {
  const LoadModel = () => {
    const gltf = useLoader(GLTFLoader, '/blueMask.glb');
    return (
      <mesh rotation={[2, Math.PI / 2, 1]}>
        <primitive
          object={gltf.scene}
          dispose={null}
          scale={0.2}
          position={[0, 0, 0]}
        />
      </mesh>
    );
  };
  console.log(size, color);
  return (
    <Suspense fallback={null}>
      <LoadModel />
      {/* <Environment preset='sunset' background={true} /> */}
    </Suspense>
  );
  // return <div css={[circle, circleSize[size], circleColor[color]]}></div>;
};

// const circleColor = {
//   red: css`
//     background-color: #b42b51;
//   `,
//   blue: css`
//     background-color: #2b51b4;
//   `,
//   selectedRed: css`
//     background-color: #5a1629;
//   `,
//   selectedBlue: css`
//     background-color: #16295a;
//   `,
// };

// const circleSize = [
//   css`
//     width: 24px;
//     height: 24px;
//     opacity: 0.9;
`,
//   css`;
//     width: 48px;
//     height: 48px;
//     opacity: 0.7;
//   `,
//   css`
//     width: 72px;
//     height: 72px;
//     opacity: 0.5;
//   `,
// ];

// const circle = css`
//   border-radius: 50%;
//   top: 50%;
//   left: 50%;
//   transform: translateY(-50%) translateX(-50%);
//   position: absolute;
// `;

export default Circle;
