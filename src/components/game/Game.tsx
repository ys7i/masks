/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import React, { useState } from 'react';
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

  const judgeWinner = (copy: Situation): void => {
    const winnerColor = caluculateWinner(copy);
    if (winnerColor === null) return;
    setWinner((status) => {
      if (status !== null) {
        return turn === 'red' ? 'blue' : 'red';
      }
      return winnerColor;
    });
    removeSelected();
    return;
  };

  const changeToSelected = (aboutMe: AboutMe, place: number): void => {
    switch (aboutMe) {
      case 'onBoard':
        {
          const [color, index] = findColorIndex(situation[place]);
          if (index !== -1 && color === turn) {
            setSituation((state) => {
              const copy = state.slice();
              copy[place][index] =
                color === 'red' ? 'selectedRed' : 'selectedBlue';
              return copy;
            });
            setSelected({ aboutMe: 'onBoard', place });
          }
        }
        return;

      case 'redTerritory':
        if (redMasks[place] === turn) {
          setRedMasks((state) => {
            const copy = state.slice();
            copy[place] = 'selectedRed';
            return copy;
          });
          setSelected({ aboutMe: 'redTerritory', place });
        }
        return;

      case 'blueTerritory':
        if (blueMasks[place] === turn) {
          setBlueMasks((state) => {
            const copy = state.slice();
            copy[place] = 'selectedBlue';
            return copy;
          });
          setSelected({ aboutMe: 'blueTerritory', place });
        }
        return;
    }
  };

  const onClick = (aboutMe: AboutMe, place: number): void => {
    console.log('test');
    if (winner !== null) {
      return;
    }
    if (selected === null) {
      changeToSelected(aboutMe, place);
      return;
    }
    changeToUnselected(aboutMe, place);
    return;
  };

  const changeToUnselected = (aboutMe: AboutMe, place: number): void => {
    if (selected === null) {
      console.error('One piece must be selected');
      throw new Error();
    }
    switch (aboutMe) {
      case 'onBoard': {
        const [clickedMask, clickedIndex] = findColorIndex(situation[place]); //clickされた場所
        const selectedIndex = selectedSize();
        if (clickedMask === null) {
          setSituation((state) => {
            const copy = state.slice();
            copy[place][selectedIndex] = turn;
            judgeWinner(copy);
            return copy;
          });
          removeSelected();
          setTurn(turn === 'red' ? 'blue' : 'red');
          return;
        }
        if (clickedMask === 'selectedRed' || clickedMask === 'selectedBlue') {
          //board上かつselectedをclick
          nonSelected();
          return;
        }
        if (selectedIndex > clickedIndex) {
          setSituation((state) => {
            const copy = state.slice();
            copy[place][selectedIndex] = turn;
            judgeWinner(copy);
            return copy;
          });
          removeSelected();
          setTurn(turn === 'red' ? 'blue' : 'red');
          return;
        }
        if (
          (selected.aboutMe === 'redTerritory' ||
            selected.aboutMe === 'blueTerritory') &&
          clickedMask === turn
        ) {
          nonSelected();
          changeToSelected('onBoard', place);
        }
        return;
      }
      case 'redTerritory':
        if (turn === 'blue') {
          return;
        } else {
          if (selected.aboutMe === 'redTerritory' && selected.place === place) {
            nonSelected();
            return;
          }
          if (selected.aboutMe === 'redTerritory' && selected.place !== place) {
            nonSelected();
            if (redMasks[place] === 'red') {
              setRedMasks((state) => {
                const copy = state.slice();
                copy[place] = 'selectedRed';
                return copy;
              });
              setSelected({ aboutMe: 'redTerritory', place: place });
            }
            return;
          }
          if (selected.aboutMe === 'onBoard') {
            nonSelected();
            changeToSelected('redTerritory', place);
            return;
          }
          return;
        }

      case 'blueTerritory':
        if (turn === 'red') {
          return;
        } else {
          //turn === 'blue'
          if (
            selected.aboutMe === 'blueTerritory' &&
            selected.place === place
          ) {
            nonSelected();
            return;
          }
          if (
            selected.aboutMe === 'blueTerritory' &&
            selected.place !== place
          ) {
            nonSelected();
            if (blueMasks[place] === 'blue') {
              setBlueMasks((state) => {
                const copy = state.slice();
                copy[place] = 'selectedBlue';
                return copy;
              });
              setSelected({ aboutMe: 'blueTerritory', place: place });
            }
            return;
          }
          if (selected.aboutMe === 'onBoard') {
            nonSelected();
            changeToSelected('blueTerritory', place);
            return;
          }
        }
    }
  };
  //removeSelectedとsetSelectedはどちらか片方
  const removeSelected = () => {
    if (selected === null) {
      return;
    }
    if (selected.aboutMe === 'onBoard') {
      setSituation((state) => {
        const copy = state.slice();
        const [color, index] = findColorIndex(state[selected.place]);
        if (color === 'selectedRed' || color === 'selectedBlue') {
          copy[selected.place][index] = null;
        }
        return state;
      });
      setSelected(null);
      return;
    }

    if (selected.aboutMe === 'redTerritory') {
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
      return;
    }
    if (selected.aboutMe === 'redTerritory') {
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

  const findColorIndex = (mask: Mask[]): [Mask, number] => {
    for (let i = 2; i > -1; i--) {
      if (mask[i] !== null) {
        return [mask[i], i];
      }
    }
    return [null, -1];
  };

  const caluculateWinner = (copy: Situation): Turn | null => {
    const situationCopy = copy.slice();
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
    let win = null;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (result[a] && result[a] === result[b] && result[a] === result[c]) {
        if (win !== null) {
          return turn === 'red' ? 'blue' : 'red';
        }
        win = result[a] as Turn;
      }
    }
    return win;
  };
  return (
    <div css={game}>
      {winner === 'red' ? (
        <div css={redWin}> You Win!</div>
      ) : turn === 'red' && winner === null ? (
        <div css={turnRed}>Your Turn</div>
      ) : (
        <div css={none}></div>
      )}
      <Canvas
        css={canvas}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 2.5, 0],
        }}
        style={{ height: 1000, width: 1000 }}
      >
        <axesHelper position={[0, 0.3, 0]} />
        <ambientLight intensity={0.1} color='lightblue' />
        <directionalLight position={[2, 2, 0]} color='lightblue' />
        <Territory
          handled={redMasks}
          aboutMe='redTerritory'
          clickMethod={onClick}
        />
        <Board situation={situation} clickMethod={onClick} />
        <Territory
          handled={blueMasks}
          aboutMe='blueTerritory'
          clickMethod={onClick}
        />
      </Canvas>
      {winner === 'blue' ? (
        <div css={blueWin}>You Win!</div>
      ) : turn === 'blue' && winner === null ? (
        <div css={turnBlue}>Your Turn</div>
      ) : (
        <div css={none}></div>
      )}
    </div>
  );
};
const game = css`
  margin: 0 auto;
  display: grid;
  place-items: center;
`;

const turnRed = css`
  transform: rotate(180deg);
  background-color: #b42b51;
  width: 120px;
  height: 36px;
  font-size: 24px;
  border-radius: 50%;
  margin: 24px auto;
  text-align: center;
  color: white;
`;

const redWin = css`
  transform: rotate(180deg);
  color: #b42b51;
  width: 120px;
  height: 36px;
  font-size: 24px;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
`;
const none = css`
  width: 120px;
  height: 36px;
  margin: 24px auto;
  text-align: center;
`;
const turnBlue = css`
  background-color: #2b51b4;
  width: 120px;
  height: 36px;
  font-size: 24px;
  border-radius: 50%;
  margin: 24px auto;
  text-align: center;
  color: white;
`;

const blueWin = css`
  color: #2b51b4;
  width: 120px;
  height: 36px;
  font-size: 24px;
  margin: 24px auto;
  text-align: center;
  font-weight: bold;
`;

const canvas = css`
  height: 300px;
`;
export default Game;
