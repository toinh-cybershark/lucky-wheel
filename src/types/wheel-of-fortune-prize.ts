export type WheelOfFortunePrize = {
  key: string;
  prize: React.ReactNode;
  color:
    | `rgb(${number}, ${number}, ${number})`
    | `hsl(${number}, ${number}%, ${number}%)`
    | `#${string}`;
  displayOrientation?: "horizontal" | "vertical";
  probability?: number;
  value: string;
};
