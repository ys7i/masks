/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { Mask, MaskColor, TerritoryMask } from '../../types/situation';
import Square from '../square/Square';

type Props = {
  color: MaskColor;
  handled: TerritoryMask;
  onClick: () => void;
};

const Territory: React.FC<Props> = ({ color, handled, onClick }) => {
  const renderSquare = (isExist: boolean, situation: Mask[]) => {
    if (isExist) {
      const size = situation.findIndex((element) => element !== null);
      return (
        <Square
          size={size}
          onClick={onClick}
          situation={situation}
          isOnBoard={false}
        />
      );
    }
  };
  return (
    <div css={territory}>
      {renderSquare(handled.large1, [null, null, color])}
      {renderSquare(handled.large2, [null, null, color])}
      {renderSquare(handled.medium1, [null, color, null])}
      {renderSquare(handled.medium2, [null, color, null])}
      {renderSquare(handled.small1, [color, null, null])}
      {renderSquare(handled.small2, [color, null, null])}
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
