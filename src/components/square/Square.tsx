/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { AboutMe, Mask, MaskColor } from '../../types/situation';
import ColorMask from '../mask/ColorMask';
import SquareModel from './../../model/Square';

export type Props = {
  situation: Mask[];
  place: number;
  aboutMe: AboutMe;
  clickMethod: (aboutMe: AboutMe, place: number) => void;
  position: number[];
};

const Square: React.FC<Props> = ({
  situation,
  place,
  clickMethod,
  aboutMe,
  position,
}) => {
  const renderMask = (index: number) => {
    if (situation[index] !== null) {
      const color = situation[index] as MaskColor;
      return <ColorMask color={color} size={index} location={position} />;
    }
  };
  return (
    <React.Suspense fallback={null}>
      <SquareModel
        position={position}
        scale={aboutMe === 'onBoard' ? 0.0128 : 0.008}
        clickMethod={clickMethod}
        place={String(place)}
        me={aboutMe}
      />
      {renderMask(0)}
      {renderMask(1)}
      {renderMask(2)}
    </React.Suspense>
  );
};

export default Square;
