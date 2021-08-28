/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { MaskColor } from '../../types/situation';

type Props = {
  color: MaskColor;
  size: number;
  onClick: () => void;
};
const Circle: React.FC<Props> = ({ color, size, onClick }) => {
  return (
    <div
      css={[circle, circleSize[size], circleColor[color]]}
      onClick={() => onClick()}
    ></div>
  );
};

const circleColor = {
  red: css`
    background-color: #b42b51;
  `,
  blue: css`
    background-color: #2b51b4;
  `,
};

const circleSize = [
  css`
    width: 2rem;
    height: 2rem;
    opacity: 0.9;
  `,
  css`
    width: 4rem;
    height: 4rem;
    opacity: 0.7;
  `,
  css`
    width: 6rem;
    height: 6rem;
    opacity: 0.5;
  `,
];

const circle = css`
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  position: absolute;
`;

export default Circle;
