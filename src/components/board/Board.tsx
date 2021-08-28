/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { Situation } from '../../types/situation';
import Square from '../square/Square';

type Props = {
  situation: Situation;
  onClick: () => void;
};

const Board: React.FC<Props> = ({ situation, onClick }) => {
  return (
    <div css={board}>
      <div css={boardRow}>
        <Square situation={situation[0]} onClick={onClick} size={2} />
        <Square situation={situation[1]} onClick={onClick} size={2} />
        <Square situation={situation[2]} onClick={onClick} size={2} />
      </div>
      <div css={boardRow}>
        <Square situation={situation[3]} onClick={onClick} size={2} />
        <Square situation={situation[4]} onClick={onClick} size={2} />
        <Square situation={situation[5]} onClick={onClick} size={2} />
      </div>
      <div css={boardRow}>
        <Square situation={situation[6]} onClick={onClick} size={2} />
        <Square situation={situation[7]} onClick={onClick} size={2} />
        <Square situation={situation[8]} onClick={onClick} size={2} />
      </div>
    </div>
  );
};

const boardRow = css`
  display: flex;
  justify-content: center;
`;
const board = css`
  margin: 0 auto;
`;

export default Board;
