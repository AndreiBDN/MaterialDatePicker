import { createContext } from "react";
import { AnimationDirectionType } from "../types";

export const AnimationDirection = createContext<AnimationDirectionType>(AnimationDirectionType.LEFT)