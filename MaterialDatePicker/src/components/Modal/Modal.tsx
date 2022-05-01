import React, { FC, SyntheticEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { _ANIMATION_DATA } from '../../constants/animationData';
import { _MONTHS } from '../../constants/constants';
import { Padding, Size } from '../../constants/size';
import { AnimationDirection } from '../../contexts/PickerContexts';
import { AnimationDirectionType } from '../../types';
import { addZero, dayInMonth } from '../../utils/helpers';
import { AnimatedFlatList } from '../AnimatedFlatList';
import Button from '../Button/Button';
import DataList, { OptionType } from '../DataList/DataList';

type ModalType = {
    onClose: () => void
}

type DateStateType = {
    date: number
    month: number
    year: number
}



const Modal: FC<ModalType> = ({
    onClose
}) => {
    const [date, setDate] = useState<DateStateType>({
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
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

    const changeDate = useCallback((_value: string, _key: keyof DateStateType) => {
        setDate(prev => ({ ...prev, [_key]: Number(_value) }))
    }, [])

    const daysArray = useMemo((): Array<OptionType> => {
        let days: Array<OptionType> = []
        for (let i = 1; i < dayInMonth(date.month, date.year); i++) {
            days.push({
                value: `${i}`,
                label: addZero(i)
            }
            )
        }
        return days
    }, [date.month, date.year])

    const monthArray = useMemo((): Array<OptionType> => {
        let options: Array<OptionType> = []

        Object.entries(_MONTHS).forEach(([key, value]) => {
            options.push({
                value: key,
                label: value
            })
        })
        return options
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
                <View style={style.content}>
                    <DataList options={daysArray} onElementPress={(value) => changeDate(value, 'date')} />
                    <DataList options={monthArray} onElementPress={(value) => changeDate(value, 'month')} />
                    <Button onPress={onCloseModal}>Close modal</Button>

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
        backgroundColor: '#c1c4f2',
        height: 300,
        borderRadius: 10,
        // overflow: 'hidden',
        padding: Padding.COMMON
    },
    content: {

    }
})