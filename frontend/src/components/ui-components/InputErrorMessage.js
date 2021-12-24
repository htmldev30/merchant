import React from 'react'
import { Text, View } from 'native-base'

const InputErrorMessage = ({ children }) => {
    return (
        <View>
            <Text>{children}</Text>
        </View>
    )
}

export default InputErrorMessage
