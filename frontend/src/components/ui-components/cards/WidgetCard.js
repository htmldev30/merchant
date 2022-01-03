import React from 'react'
import { Center, Pressable } from 'native-base'
export default WidgetCard = ({ bgColor, text, icon, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Center h={20} w={20} rounded="md" shadow={1} bgColor={bgColor}>
                {/* analytics for store  */}
                {icon}
            </Center>
        </Pressable>
    )
}
