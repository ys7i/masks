/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { Mask, MaskColor } from '../../types/situation';
import Circle from '../circle/Circle';

export type Props = {
  situation: Mask[];
  onClick: () => void;
  size: number;
  isOnBoard?: boolean;
};

const Square: React.FC<Props> = ({
  situation,
  onClick,
  size,
  isOnBoard = true,
}) => {
  const renderCircle = (index: number) => {
    if (situation[index] !== null) {
      const color = situation[index] as MaskColor;
      return <Circle size={index} color={color} onClick={onClick} />;
    }
  };
  renderCircle(0);
  return (
    <div css={[sizeStyle[size], isOnBoard ? onBoard : square]}>
      {renderCircle(0)}
      {renderCircle(1)}
      {renderCircle(2)}
    </div>
  );
};

const sizeStyle = [
  css`
    height: 3rem;
    width: 3rem;
    margin: 2rem 0;
  `,
  css`
    height: 5rem;
    width: 5rem;
    margin: 1rem 0;
  `,
  css`
    height: 7rem;
    width: 7rem;
  `,
];

const square = css`
  background: #fff;
  float: left;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1rem;
  padding: 0;
  position: relative;
`;
const onBoard = css`
  border: 1px solid #999;
  background: #fff;
  float: left;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1rem;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  position: relative;
`;
export default Square;
