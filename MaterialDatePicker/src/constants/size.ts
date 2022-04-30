import { Dimensions } from "react-native";

const dimensions = Dimensions.get('screen')

export enum Size {
    WIDTH = dimensions.width,
    HEIGHT = dimensions.height,
    SCALE = dimensions.scale,
    FONT_SCALE = dimensions.fontScale
}

export enum Padding {
    COMMON = 12
}