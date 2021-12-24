import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Button } from 'native-base'
const C_Button = ({
    onPress,
    title,
    backgroundColor,
    size = 'md',
    color = 'primary',
    leftIcon = false,
    loading = false,
    loadingText,
    icon,
    transition,
    disabled,
    className = '',
    children,
    styles,
    ...props
}) => {
    return (
        <>
            <Button
                onPress={onPress}
                size={size}
                colorScheme={color}
                leftIcon={leftIcon}
                {...props}
                {...(loading ? (isLoadingText = loadingText) : false)}
            >
                {title}
            </Button>
        </>
    )
}

export default C_Button
