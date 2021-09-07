/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { Suspense } from 'react';
import { MaskColor } from '../../types/situation';
import BlueMask from '../../model/BlueMask';
import RedMask from '../../model/RedMask';

type Props = {
  color: MaskColor;
  size: number;
  location: number[];
};
const ColorMask: React.FC<Props> = ({ color, size, location }) => {
  let position = location.slice();
  position[1] = size === 2 ? 0.05 : size === 1 ? 0.02 : 0;
  if (color === 'red' || color === 'selectedRed') {
    return (
      <Suspense fallback={null}>
        <RedMask
          scale={size === 2 ? 0.1 : size === 1 ? 0.07 : 0.04}
          position={
            color === 'red'
              ? position
              : [position[0], position[1] + 0.3, position[2]]
          }
        />
      </Suspense>
    );
  }
  if (color === 'blue' || color === 'selectedBlue') {
    return (
      <Suspense fallback={null}>
        <BlueMask
          scale={size === 2 ? 0.1 : size === 1 ? 0.07 : 0.04}
          position={
            color === 'blue'
              ? position
              : [position[0], position[1] + 0.3, position[2]]
          }
        />
      </Suspense>
    );
  }
  return null;
};

export default ColorMask;
