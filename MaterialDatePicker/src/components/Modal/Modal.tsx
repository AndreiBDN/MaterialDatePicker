import React, { FC, SyntheticEvent, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { _ANIMATION_DATA } from '../../constants/animationData';
import { Padding, Size } from '../../constants/size';
import { AnimationDirection } from '../../contexts/PickerContexts';
import { AnimationDirectionType } from '../../types';
import { AnimatedFlatList } from '../AnimatedFlatList';
import Button from '../Button/Button';

type ModalType = {
    onClose: () => void
}

const Modal: FC<ModalType> = ({
    onClose
}) => {
    const animDirection = useContext(AnimationDirection)

    const isVerticalAnim = useMemo((): boolean => {
        if (animDirection === AnimationDirectionType.BOTTOM ||
            animDirection === AnimationDirectionType.TOP) {
            return true
        }
        return false
    }, [animDirection])
    const ANIMATE_DURATION = 200;

    const AnimInit = {
        start: 0,
        end: 100
    }

    const wrapperAnim = useRef(new Animated.Value(0)).current

    const opacity = wrapperAnim.interpolate({ inputRange: [0, 100], outputRange: [0, 1] })
    const position = wrapperAnim.interpolate({ inputRange: [0, 100], outputRange: [_ANIMATION_DATA[animDirection], 0] })

    const startAnimation = () => {
        Animated.spring(wrapperAnim, { toValue: AnimInit.end, useNativeDriver: false }).start();
    }
    const endAnimation = (endFunction: () => void) => {
        Animated.timing(wrapperAnim, { toValue: AnimInit.start, useNativeDriver: false, duration: ANIMATE_DURATION }).start(endFunction);
    }
    const startModalAnimation = () => {
        Animated.spring(wrapperAnim, { toValue: AnimInit.end, useNativeDriver: false }).start();
    }
    const endModalAnimation = () => {
        Animated.timing(wrapperAnim, { toValue: AnimInit.start, useNativeDriver: false, duration: ANIMATE_DURATION }).start();
    }

    const onCloseModal = useCallback(() => {
        // e.stopPropagation()
        endAnimation(onClose)

    }, [])

    const resetTouchFunction = useCallback((e: SyntheticEvent<TouchEvent>) => {
        e.stopPropagation()

    }, [])


    useEffect(() => {
        startAnimation()
    }, [])

    return (
        <Animated.View onTouchStart={onCloseModal} style={[style.wrapper, {
            opacity,

        }]}>
            <Animated.View
                onTouchStart={resetTouchFunction}
                style={[style.modal, {

                    transform: [
                        { translateY: isVerticalAnim ? position : 0 },
                        { translateX: !isVerticalAnim ? position : 0 },
                    ]
                }]}>
                <View style={style.modal}>
                    <Button onPress={onCloseModal}>Close modal</Button>
                    <AnimatedFlatList
                        options={[
                            {
                                id: '1',
                                element: <Text style={{
                                    backgroundColor: '#fff'
                                }}>121232113</Text>
                            },
                            {
                                id: '2',
                                element: <Text style={{
                                    backgroundColor: '#fff'
                                }}>121232113</Text>
                            },
                            {
                                id: '3',
                                element: <Text style={{
                                    backgroundColor: '#fff'
                                }}>121232113</Text>
                            },
                            {
                                id: '4',
                                element: <Text style={{
                                    backgroundColor: '#fff'
                                }}>121232113</Text>
                            },
                            {
                                id: '5',
                                element: <Text style={{
                                    backgroundColor: '#fff'
                                }}>121232113</Text>
                            },
                            {
                                id: '6',
                                element: <Text style={{
                                    backgroundColor: '#fff'
                                }}>121232113</Text>
                            },
                        ]}
                        item_height={80}
                        onElementPress={function (id: string): void {
                            throw new Error('Function not implemented.');
                        }}
                        value={''}
                    />
                </View>

            </Animated.View>
        </Animated.View>
    );
};

export default Modal;

const style = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        height: Size.HEIGHT,
        width: Size.WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        // flex: 1
    },
    modal: {
        width: Size.WIDTH - Padding.COMMON * 2,
        backgroundColor: 'red',
        height: 300,
        borderRadius: 10,
        // overflow: 'hidden',
        padding: Padding.COMMON
    }
})