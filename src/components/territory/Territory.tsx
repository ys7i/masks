/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { AboutMe, Mask } from '../../types/situation';
import Square from '../square/Square';

type Props = {
  handled: Mask[];
  aboutMe: AboutMe;
  clickMethod: (aboutMe: AboutMe, place: number) => void;
};

const location = {
  redTerritory: [
    [-1, 0, -1.25],
    [-0.6, 0, -1.25],
    [-0.2, 0, -1.25],
    [0.2, 0, -1.25],
    [0.6, 0, -1.25],
    [1, 0, -1.25],
  ],
  blueTerritory: [
    [1, 0, 1.25],
    [0.6, 0, 1.25],
    [0.2, 0, 1.25],
    [-0.2, 0, 1.25],
    [-0.6, 0, 1.25],
    [-1, 0, 1.25],
  ],
  onBoard: [],
};

const Territory: React.FC<Props> = ({ handled, aboutMe, clickMethod }) => {
  const renderSquare = (situation: Mask[], place: number) => {
    return (
      <Square
        situation={situation}
        place={place}
        clickMethod={clickMethod}
        aboutMe={aboutMe}
        position={location[aboutMe][place]}
      />
    );
  };
  return (
    <React.Suspense fallback={null}>
      {renderSquare([null, null, handled[5]], 5)}
      {renderSquare([null, null, handled[4]], 4)}
      {renderSquare([null, handled[3], null], 3)}
      {renderSquare([null, handled[2], null], 2)}
      {renderSquare([handled[1], null, null], 1)}
      {renderSquare([handled[0], null, null], 0)}
    </React.Suspense>
  );
};

const territory = css`
  width: 360px;
  height: 84px;
  border: solid 1px black;
  margin: 12px auto;
  display: flex;
`;

export default Territory;
