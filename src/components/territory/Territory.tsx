/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { AboutMe, Mask } from '../../types/situation';
import Square from '../square/Square';

type Props = {
  handled: Mask[];
  aboutMe: AboutMe;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Territory: React.FC<Props> = ({ handled, aboutMe, onClick }) => {
  const renderSquare = (situation: Mask[], place: number, size: number) => {
    // const size = situation.findIndex((element) => element !== null);
    // if (size !== -1) {
    return (
      <Square
        situation={situation}
        size={size}
        place={place}
        aboutMe={aboutMe}
        onClick={onClick}
      />
    );
    // }
  };
  return (
    <div css={territory}>
      {renderSquare([null, null, handled[5]], 5, 2)}
      {renderSquare([null, null, handled[4]], 4, 2)}
      {renderSquare([null, handled[3], null], 3, 1)}
      {renderSquare([null, handled[2], null], 2, 1)}
      {renderSquare([handled[1], null, null], 1, 0)}
      {renderSquare([handled[0], null, null], 0, 0)}
    </div>
  );
};

const territory = css`
  width: 450px;
  height: 105px;
  border: solid 1px black;
  margin: 15px auto;
  display: flex;
`;

export default Territory;
