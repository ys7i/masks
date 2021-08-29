/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AboutMe, Mask, Situation, Turn } from '../../types/situation';
import Board from '../board/Board';
import Territory from '../territory/Territory';

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

  const [winner, setWinner] = useState<Turn | null>(null);

  useEffect(() => {
    const winnerColor = caluculateWinner();
    if (winnerColor === null) return;
    setWinner(winnerColor);
  }, [situation]);

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (winner !== null) {
      return;
    }
    const [aboutMe, place]: [AboutMe, number] = [
      e.currentTarget.dataset.me as AboutMe,
      Number(e.currentTarget.dataset.place),
    ];
    if (selected === null) {
      changeToSelected(aboutMe, place);
      return;
    }

    switch (aboutMe) {
      case 'onBoard': {
        const [clickedMask, clickedIndex] = findColorIndex(situation[place]); //clickされた場所
        const selectedIndex = selectedSize();
        if (clickedMask === null) {
          setSituation((state) => {
            const copy = state.slice();
            copy[place][selectedIndex] = turn;
            return copy;
          });
          removeSelected();
          setTurn(turn === 'red' ? 'blue' : 'red');
          return;
        }
        if (clickedMask === 'selectedRed' || clickedMask === 'selectedBlue') {
          //board上かつselectedをclick
          nonSelected();
          removeSelected();
          return;
        }
        if (selectedIndex > clickedIndex) {
          setSituation((state) => {
            const copy = state.slice();
            copy[place][selectedIndex] = turn;
            return copy;
          });
          setTurn(turn === 'red' ? 'blue' : 'red');
          removeSelected();
          return;
        }
        return;
      }
      case 'redTerriory':
        if (turn === 'blue') {
          return;
        }
        if (selected.aboutMe === 'redTerriory' && selected.place === place) {
          nonSelected();
          return;
        }
        {
          nonSelected();
          setRedMasks((state) => {
            const copy = state.slice();
            copy[place] = 'selectedRed';
            return copy;
          });
          setSelected({ aboutMe: 'redTerriory', place: place });
          return;
        }
      case 'blueTerritory':
        if (turn === 'red') {
          return;
        }
        if (selected.aboutMe === 'blueTerritory' && selected.place === place) {
          nonSelected();
          return;
        }
        {
          nonSelected();
          const copyBlue = blueMasks.slice();
          copyBlue[place] = 'selectedBlue';
          setBlueMasks((state) => {
            const copy = state.slice();
            copy[place] = 'selectedBlue';
            return copy;
          });
          setSelected({ aboutMe: 'blueTerritory', place: place });
          return;
        }
    }
  };
  //removeSelectedとsetSelectedは同じ関数内で呼び出してはいけない
  const removeSelected = () => {
    if (selected === null) {
      return;
    }
    if (selected.aboutMe === 'onBoard') {
      setSituation((state) => {
        const copy = state.slice();
        const [, index] = findColorIndex(state[selected.place]);
        copy[selected.place][index] = null;
        return copy;
      });
      setSelected(null);
      return;
    }

    if (selected.aboutMe === 'redTerriory') {
      setRedMasks((state) => {
        const copy = state.slice();
        copy[selected.place] = null;
        return copy;
      });
    } else {
      setBlueMasks((state) => {
        const copy = state.slice();
        copy[selected.place] = null;
        return copy;
      });
    }
    setSelected(null);
  };

  const nonSelected = () => {
    if (selected === null) {
      return;
    }
    if (selected.aboutMe === 'onBoard') {
      setSituation((state) => {
        const copy = state.slice();
        const [, index] = findColorIndex(situation[selected.place]);
        copy[selected.place][index] = turn;
        return copy;
      });
      setSelected(null);
    }
    if (selected.aboutMe === 'redTerriory') {
      setRedMasks((state) => {
        const copy = state.slice();
        copy[selected.place] = turn;
        return copy;
      });
    } else {
      setBlueMasks((state) => {
        const copy = state.slice();
        copy[selected.place] = turn;
        return copy;
      });
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
            setSituation((state) => {
              const copy = state.slice();
              copy[place][index] ===
                (color === 'red' ? 'selectedRed' : 'selectedBlue');
              return copy;
            });
            setSelected({ aboutMe: 'onBoard', place });
          }
        }
        break;

      case 'redTerriory':
        if (redMasks[place] === turn) {
          setRedMasks((state) => {
            const copy = state.slice();
            copy[place] = 'selectedRed';
            return copy;
          });
          setSelected({ aboutMe: 'redTerriory', place });
        }
        break;

      case 'blueTerritory':
        if (blueMasks[place] === turn) {
          setBlueMasks((state) => {
            const copy = state.slice();
            copy[place] = 'selectedBlue';
            return copy;
          });
          setSelected({ aboutMe: 'blueTerritory', place });
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

  const caluculateWinner = (): Turn | null => {
    const situationCopy = situation.slice();
    if (selected !== null) {
      return null;
    }
    const result = situationCopy.map((element) => {
      if (element[2] !== null) {
        return element[2];
      }
      if (element[1] !== null) {
        return element[1];
      }
      if (element[0] !== null) {
        return element[0];
      }
      return null;
    });
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (result[a] && result[a] === result[b] && result[a] === result[c]) {
        return result[a] as Turn;
      }
    }
    return null;
  };

  return (
    <div css={game}>
      {winner === 'red' ? (
        <div css={turnRed}>You Win!</div>
      ) : turn === 'red' && winner === null ? (
        <div css={turnRed}>Your Turn</div>
      ) : (
        <div css={none}></div>
      )}
      <Territory handled={redMasks} aboutMe='redTerriory' onClick={onClick} />
      <div>
        <Board situation={situation} onClick={onClick} />
      </div>
      <Territory
        handled={blueMasks}
        aboutMe='blueTerritory'
        onClick={onClick}
      />
      {winner === 'blue' ? (
        <div css={turnBlue}>You Win!</div>
      ) : turn === 'blue' && winner === null ? (
        <div css={turnBlue}>Your Turn</div>
      ) : (
        <div css={none}></div>
      )}
    </div>
  );
};
const game = css`
  margin: 5rem auto;
`;

const turnRed = css`
  transform: rotate(180deg);
  background-color: #b42b51;
  width: 10rem;
  height: 3rem;
  font-size: 2rem;
  border-radius: 50%;
  margin: 2rem auto;
  text-align: center;
  color: white;
`;
const none = css`
  width: 10rem;
  height: 3rem;
  margin: 2rem auto;
  text-align: center;
`;
const turnBlue = css`
  background-color: #2b51b4;
  width: 10rem;
  height: 3rem;
  font-size: 2rem;
  border-radius: 50%;
  margin: 2rem auto;
  margin: 1rem auto;
  text-align: center;
  color: white;
`;
export default Game;
