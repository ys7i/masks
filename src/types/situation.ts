export type Turn = 'red' | 'blue';
export type MaskColor = Turn | 'selectedRed' | 'selectedBlue';
export type Mask = MaskColor | null;
export type Situation = Mask[][];
export type AboutMe = 'redTerriory' | 'blueTerritory' | 'onBoard';
