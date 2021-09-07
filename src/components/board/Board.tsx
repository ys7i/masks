/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
// import { useLoader } from '@react-three/fiber';
import React from 'react';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AboutMe, Situation } from '../../types/situation';
import Square from '../square/Square';

type Props = {
  situation: Situation;
  clickMethod: (aboutMe: AboutMe, place: number) => void;
};

const location = [
  [-0.65, 0, -0.65],
  [0, 0, -0.65],
  [0.65, 0, -0.65],
  [-0.65, 0, 0],
  [0, 0, 0],
  [0.65, 0, 0],
  [-0.65, 0, 0.65],
  [0, 0, 0.65],
  [0.65, 0, 0.65],
];

const Board: React.FC<Props> = ({ situation, clickMethod }) => {
  const renderSquare = (place: number) => {
    return (
      <Square
        situation={situation[place]}
        clickMethod={clickMethod}
        place={place}
        aboutMe='onBoard'
        position={location[place]}
      />
    );
  };

  return (
    <React.Suspense fallback={null}>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </React.Suspense>
  );
};

// const boardRow = css`
//   display: flex;
//   justify-content: center;
// `;
// const board = css`
//   margin: 0 auto;
// `;

export default Board;
