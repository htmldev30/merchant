import React from 'react'
import { Button, Spinner } from 'native-base'
const C_Button = ({
    onPress,
    title,
    size = 'lg',
    color = 'primary',
    leftIcon,
    loading = false,
    loadingText,
    children,
    styles,
    ...props
}) => {
    return (
        <Button
            onPress={onPress}
            size={size}
            colorScheme={color}
            leftIcon={loading ? <Spinner color="white" /> : leftIcon}
            {...styles}
            {...props}
        >
            {title}
        </Button>
    )
}

export default C_Button
