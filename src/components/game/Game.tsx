/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { Situation, TerritoryMask } from '../../types/situation';
import Board from '../board/Board';
import Territory from '../territory/Territory';

const game = css`
  margin: 5rem auto;
`;
const Game: React.FC = () => {
  const [situation, setSituation] = useState<Situation>([
    ['blue', null, null],
    [null, 'red', null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [redMasks, setRedMasks] = useState<TerritoryMask>({
    large1: true,
    large2: true,
    medium1: true,
    medium2: true,
    small1: true,
    small2: true,
  });
  const [blueMasks, setBlueMasks] = useState<TerritoryMask>({
    large1: false,
    large2: false,
    medium1: false,
    medium2: false,
    small1: false,
    small2: false,
  });
  const [isMaskSelected, setIsMaskSelected] = useState<boolean>(true);
  const onClick = () => {
    setIsMaskSelected(!isMaskSelected);
    setRedMasks(blueMasks);
    setBlueMasks(redMasks);
    setSituation(situation);
  };
  return (
    <div css={game}>
      <Territory handled={redMasks} color='red' onClick={() => onClick()} />
      <div>
        <Board
          situation={situation}
          onClick={() => {
            onClick();
          }}
        />
      </div>
      <Territory handled={blueMasks} color='blue' onClick={() => onClick()} />
    </div>
  );
};

export default Game;
