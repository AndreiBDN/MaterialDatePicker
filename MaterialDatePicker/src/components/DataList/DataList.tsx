import React, { FC } from 'react'
import { FlatList, Pressable, Text } from 'react-native'

export type OptionType = {
    label: string
    value: string
}
type ListType = {
    options: Array<OptionType>
    item_height?: number
    onElementPress: (id: string) => void
    value?: string
}

const DataList: FC<ListType> = ({
    options,
    item_height,
    onElementPress,
    value

}) => {
    return (
        <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => <Item onPress={onElementPress} item={item} />}
        />
    )
}

export default React.memo(DataList)


type ItemType = {
    item: OptionType
    onPress: (item: string) => void
}
const Item: FC<ItemType> = ({ item, onPress }) => {
    return (
        <Pressable onPress={() => onPress(item.value)}>
            <Text>{item.label}</Text>
        </Pressable>
    )
}