/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { Suspense } from 'react';
import { MaskColor } from '../../types/situation';
import Mask from '../../model/Masks';

type Props = {
  color: MaskColor;
  size: number;
  location: number[];
};
const ColorMask: React.FC<Props> = ({ color, size, location }) => {
  let position = location.slice();
  position[1] = size === 2 ? 0.05 : size === 1 ? 0.02 : 0;
    return (
      <Suspense fallback={null}>
        <Mask
          scale={size === 2 ? 0.1 : size === 1 ? 0.07 : 0.04}
          position={
            (color === 'red' || color === 'blue')
              ? [position[0], position[1], position[2]]
              : [position[0], position[1] + 0.3, position[2]]
          }
          color={(color === 'red' || color === 'selectedRed') ? 'red' : 'blue'}
        />
      </Suspense>
    );
};

export default ColorMask;
