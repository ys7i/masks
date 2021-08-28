/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { AboutMe, Mask, Situation, Turn } from '../../types/situation';
import Board from '../board/Board';
import Territory from '../territory/Territory';

const game = css`
  margin: 5rem auto;
`;
const Game: React.FC = () => {
  const [situation, setSituation] = useState<Situation>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [redMasks, setRedMasks] = useState<Mask[]>([
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
  ]);
  const [blueMasks, setBlueMasks] = useState<Mask[]>([
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
  ]);
  const [turn, setTurn] = useState<Turn>('red');
  const [selected, setSelected] = useState<{
    aboutMe: AboutMe;
    place: number;
  } | null>(null);

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    const [aboutMe, place]: [AboutMe, number] = [
      e.currentTarget.dataset.me as AboutMe,
      Number(e.currentTarget.dataset.place),
    ];
    console.log(aboutMe, place);
    if (selected === null) {
      changeToSelected(aboutMe, place);
      return;
    }

    switch (aboutMe) {
      case 'onBoard':
        {
          const [clickedMask, clickedIndex] = findColorIndex(situation[place]); //clickされた場所
          const selectedIndex = selectedSize();
          console.log(clickedMask);
          if (clickedMask === null) {
            const copy = situation.slice();
            copy[place][selectedIndex] = turn;
            setSituation(copy);
            removeSelected();
            // nonSelected();
            setTurn(turn === 'red' ? 'blue' : 'red');
            return;
          }
          if (clickedMask === 'selectedRed' || clickedMask === 'selectedBlue') {
            //board上かつselectedをclick
            nonSelected();
          }
          if (selectedIndex > clickedIndex) {
            const copy = situation.slice();
            copy[place][clickedIndex] = turn;
            setSituation(copy);
            setTurn(turn === 'red' ? 'blue' : 'red');
          }
          nonSelected();
        }
        break;
      case 'redTerriory':
        break;
      case 'blueTerritory':
        break;
    }
  };

  const removeSelected = () => {
    if (selected === null) {
      return;
    }
    if (selected.aboutMe === 'onBoard') {
      const copy = situation.slice();
      const [, index] = findColorIndex(situation[selected.place]);
      copy[selected.place][index] = null;
      setSituation(copy);
      return;
    }
    const territory =
      selected.aboutMe === 'redTerriory' ? redMasks.slice() : blueMasks.slice();
    territory[selected.place] = null;
    if (selected.aboutMe === 'redTerriory') {
      console.log(territory);
      setRedMasks(territory);
      console.log(territory);
    } else {
      setBlueMasks(territory);
    }
  };

  const nonSelected = () => {
    if (selected === null) {
      return;
    }
    if (selected.aboutMe === 'onBoard') {
      const copy = situation.slice();
      const [, index] = findColorIndex(situation[selected.place]);
      copy[selected.place][index] = turn;
      setSituation(copy);
      setSelected(null);
    }
    const territory =
      selected.aboutMe === 'redTerriory' ? redMasks.slice() : blueMasks.slice();
    territory[selected.place] = turn;
    if (selected.aboutMe === 'redTerriory') {
      setRedMasks(territory);
    } else {
      setBlueMasks(territory);
    }
    setSelected(null);
  };

  const selectedSize = (): number => {
    if (selected === null) {
      return -1;
    }
    if (selected.aboutMe === 'onBoard') {
      const [, index] = findColorIndex(situation[selected.place]);
      return index;
    }
    return Math.floor(selected.place / 2);
  };

  const changeToSelected = (aboutMe: AboutMe, place: number): void => {
    switch (aboutMe) {
      case 'onBoard':
        {
          const [color, index] = findColorIndex(situation[place]);
          if (index !== -1 && color === turn) {
            const copy = situation.slice();
            copy[place][index] ===
              (color === 'red' ? 'selectedRed' : 'selectedBlue');
            setSituation(copy);
            setSelected({ aboutMe: 'onBoard', place });
          }
        }
        break;

      case 'redTerriory':
        if (redMasks[place] === turn) {
          const copy = redMasks.slice();
          copy[place] = 'selectedRed';
          setRedMasks(copy);
          setSelected({ aboutMe: 'redTerriory', place });
        }
        break;

      case 'blueTerritory':
        if (blueMasks[place] === turn) {
          const copy = blueMasks.slice();
          copy[place] = 'selectedBlue';
          setBlueMasks(copy);
          setSelected({ aboutMe: 'redTerriory', place });
        }
        break;
    }
  };

  const findColorIndex = (mask: Mask[]): [Mask, number] => {
    for (let i = 2; i > -1; i--) {
      if (mask[i] !== null) {
        return [mask[i] as Turn, i];
      }
    }
    return [null, -1];
  };

  return (
    <div css={game}>
      <p>{turn}</p>
      <Territory handled={redMasks} aboutMe='redTerriory' onClick={onClick} />
      <div>
        <Board situation={situation} onClick={onClick} />
      </div>
      <Territory
        handled={blueMasks}
        aboutMe='blueTerritory'
        onClick={onClick}
      />
    </div>
  );
};

export default Game;
