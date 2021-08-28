export type MaskColor = 'red' | 'blue';
export type Mask = MaskColor | null;
export type Situation = Mask[][];
export type TerritoryMask = {
  large1: boolean;
  large2: boolean;
  medium1: boolean;
  medium2: boolean;
  small1: boolean;
  small2: boolean;
};
