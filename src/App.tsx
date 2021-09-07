/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import Game from './components/game/Game';

const App: React.FC = () => {
  return (
    <div css={app}>
      <Game />
    </div>
  );
};

export default App;
const app = css`
  width: max(100%, 1000px);
  height: 1200px;
  padding-top: 80px;
`;
