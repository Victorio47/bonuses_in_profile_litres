export interface ICashBackLevel {
  level: number;
  discount: number;
  min: number;
  max?: number;
}

export const CASHBACK_LEVELS: ICashBackLevel[] = [
  {
    level: 1,
    discount: 3,
    min: 0,
    max: 6000,
  },
  { level: 2, discount: 6, min: 6001, max: 9000 },
  { level: 3, discount: 9, min: 9001, max: 11000 },
  { level: 4, discount: 11, min: 11001, max: 15000 },
  { level: 5, discount: 15, min: 15001 },
];
