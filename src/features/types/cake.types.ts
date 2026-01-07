export type CakeType =
  | "party"
  | "party-double"
  | "simple"
  | "cheese"
  | "choco-banana";

export type CakeMenuItem = {
  type: CakeType;
  imageSrc: string;
  menuName: string;
  description: string;
};
