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
  nearMissEffect?: NearMissEffect,
  imagePopup:string
};
interface NearMissEffect {
  /**
   * 'before': Kim sẽ dừng sát mép với ô NẰM TRƯỚC ô trúng thưởng này.
   * 'after': Kim sẽ dừng sát mép với ô NẰM SAU ô trúng thưởng này.
   */
  targetDirection: 'before' | 'after';

  /**
   * Mức độ gần, là một số từ 0.01 đến 0.5.
   * 0.05 có nghĩa là kim sẽ dừng cách vạch ranh giới một khoảng bằng 5% độ rộng của một ô.
   */
  proximity: number;

  /**
   * Tỉ lệ (xác suất) để hiệu ứng này xảy ra, là một số từ 0 đến 1.
   */
  chance: number;
}