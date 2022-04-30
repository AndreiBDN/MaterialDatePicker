import React, { FC, PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, TextProps, TextStyle, View, ViewStyle } from 'react-native';
export enum TypeOfButton {
    LINK = 'string',
    BUTTON = 'button'
}
type ButtonType = TextProps &{
    onPress: () => void
    type?: TypeOfButton
    styles?: {
        text?: TextStyle
        button?: ViewStyle
    }
}

const Button: FC<ButtonType> = ({
    onPress,
    type = TypeOfButton.LINK,
    styles,
    children,
}) => {
    return (
        <View>
            {
                type === TypeOfButton.LINK ?
                    <Text style={[style.link, styles?.text]} onPress={onPress}>{children}</Text>
                    :
                    <Pressable onPress={onPress}>
                        <View style={[style.button, styles?.button]}>
                            <Text>{children}</Text>
                        </View>
                    </Pressable>
            }
        </View>
    )
}

export default React.memo(Button)

const style = StyleSheet.create({
    link: {

    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
})