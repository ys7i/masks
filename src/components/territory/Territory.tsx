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
  const renderSquare = (situation: Mask[], place: number) => {
    const size = situation.findIndex((element) => element !== null);
    if (size !== -1) {
      return (
        <Square
          situation={situation}
          size={size}
          place={place}
          aboutMe={aboutMe}
          onClick={onClick}
        />
      );
    }
  };
  return (
    <div css={territory}>
      {renderSquare([null, null, handled[5]], 5)}
      {renderSquare([null, null, handled[4]], 4)}
      {renderSquare([null, handled[3], null], 3)}
      {renderSquare([null, handled[2], null], 2)}
      {renderSquare([handled[1], null, null], 1)}
      {renderSquare([handled[0], null, null], 0)}
    </div>
  );
};

const territory = css`
  width: 30rem;
  height: 7rem;
  border: solid 1px black;
  margin: 1rem auto;
  display: flex;
`;

export default Territory;
