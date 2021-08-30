/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { MaskColor } from '../../types/situation';

type Props = {
  color: MaskColor;
  size: number;
};
const Circle: React.FC<Props> = ({ color, size }) => {
  return <div css={[circle, circleSize[size], circleColor[color]]}></div>;
};

const circleColor = {
  red: css`
    background-color: #b42b51;
  `,
  blue: css`
    background-color: #2b51b4;
  `,
  selectedRed: css`
    background-color: #5a1629;
  `,
  selectedBlue: css`
    background-color: #16295a;
  `,
};

const circleSize = [
  css`
    width: 30px;
    height: 30px;
    opacity: 0.9;
  `,
  css`
    width: 60px;
    height: 60px;
    opacity: 0.7;
  `,
  css`
    width: 90px;
    height: 90px;
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
