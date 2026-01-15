import type { CakeType } from "../../types/cake.types";
import { CAKE_MENU } from "../data/cakeMenu.data";

export const isCakeType = (value: string): value is CakeType =>
  CAKE_MENU.some((menu) => menu.type === value);
