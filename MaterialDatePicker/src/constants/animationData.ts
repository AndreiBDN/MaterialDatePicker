import { AnimationDirectionType } from "../types"
import { Size } from "./size"

type AnimData = {
    [key in AnimationDirectionType]: number
}

export const _ANIMATION_DATA: AnimData = {
    [AnimationDirectionType.BOTTOM]: Size.HEIGHT,
    [AnimationDirectionType.TOP]: -Size.HEIGHT,
    [AnimationDirectionType.LEFT] : -Size.WIDTH,
    [AnimationDirectionType.RIGHT] : Size.WIDTH
}