/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
// import { useLoader } from '@react-three/fiber';
import React from 'react';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Situation } from '../../types/situation';
import Square from '../square/Square';

type Props = {
  situation: Situation;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Board: React.FC<Props> = ({ situation, onClick }) => {
  const renderBoard = (place: number) => {
    return (
      <Square
        situation={situation[place]}
        onClick={onClick}
        size={2}
        place={place}
        aboutMe='onBoard'
      />
    );
  };

  return <React.Suspense fallback={null}>{renderBoard(0)}</React.Suspense>;
  // <div css={board}>
  //   <div css={boardRow}>
  //     {renderBoard(0)}
  //     {renderBoard(1)}
  //     {renderBoard(2)}
  //   </div>
  //   <div css={boardRow}>
  //     {renderBoard(3)}
  //     {renderBoard(4)}
  //     {renderBoard(5)}
  //   </div>
  //   <div css={boardRow}>
  //     {renderBoard(6)}
  //     {renderBoard(7)}
  //     {renderBoard(8)}
  //   </div>
  // </div>
};

// const boardRow = css`
//   display: flex;
//   justify-content: center;
// `;
// const board = css`
//   margin: 0 auto;
// `;

export default Board;
