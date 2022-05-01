import React, { FC, useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { Size } from '../../constants/size';


export type OptinType = {
    id: string
    element: JSX.Element
}

type ListType = {
    options: Array<OptinType>
    item_height: number
    onElementPress: (id: string) => void
    value: string
}

const AnimatedBlock = Animated.createAnimatedComponent(FlatList);

const useLazyRef = <T extends object>(initializer: () => T) => {
    const ref = useRef<T>();
    if (ref.current === undefined) {
      ref.current = initializer();
    }
    return ref.current;
  };

const AnimatedFlatList: FC<ListType> = ({
    options,
    item_height,
    onElementPress,
    value
}) => {
    const yScroll = useLazyRef(() => new Animated.Value(0));

    return (
        <Animated.FlatList

            data={options}
            bounces={false}
            onScroll={
                    Animated.event(
                        [{nativeEvent: { contentOffset: {y: yScroll}}}],
                        {useNativeDriver: true}
                    )
                }
            keyExtractor={({id}) => id}
            renderItem={({ item, index }: any) => <Item
                onPress={onElementPress}
                cardHeight={item_height}
                item={item}
                scrollData={yScroll}
                index={index}
            />
            }
            // ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            scrollEventThrottle={16}
        />
    )
}

export default React.memo(AnimatedFlatList)

type ItemType = {
    item: OptinType
    index: number
    scrollData: any
    cardHeight: number
    onPress: (id: string) => void
}

const Item: FC<ItemType> = ({
    item,
    index,
    scrollData,
    onPress,
    cardHeight
}) => {
    const height = cardHeight * 3
    const position = Animated.subtract(index * (cardHeight), scrollData);
    const isDisappearing = -cardHeight;
    const isTop = 0;
    const isBottom = height - cardHeight * 2;
    const isAppearing = height;
    const translateY = Animated.add(
        Animated.add(
            scrollData,
            scrollData.interpolate({
                inputRange: [0, 0.00001 + index * (cardHeight + 10)],
                outputRange: [0, -index * cardHeight],
                extrapolateRight: 'clamp',
            })
        ),
        position.interpolate({
            inputRange: [isBottom, isAppearing],
            outputRange: [0, 0],
            extrapolate: "clamp",
        })
    );
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp",
    });
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    });
    return (
        <Animated.View
            style={[styleItem.item, { opacity, transform: [{ translateY }, { scale }], height:cardHeight }]}
            key={index}
        >
            {item.element}
        </Animated.View>
    );
};

// const scale = scrollData.interpolate({
//     inputRange: [
//         -height * (index + 2), -height * index, height * index, height * (index + 3)
//     ],
//     outputRange: [
//         1, 1, 1, 0
//     ],
//     extrapolate:'clamp'
// })


// console.log(scale);
// return (
//     <Animated.View style={[
//         styleItem.item, {
//             transform: [{ scale }],
//             height
//         }
//     ]}>
//         {item.element}
//     </Animated.View>
// )
// }

const styleItem = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingVertical: 10
    }
})

