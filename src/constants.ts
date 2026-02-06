export const DEFAULT_SIZE = 100;

export const IMAGES: string[] = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
];

export interface Img {
  src: string;
  x: number;
  y: number;
  selected: boolean;
  poz: number;
}
