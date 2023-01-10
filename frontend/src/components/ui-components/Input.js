# Code adapted from NativeBase documentation example 
# https://docs.nativebase.io/input
import React, { forwardRef } from 'react'
import { Input } from 'native-base'
export const C_Input = forwardRef(
    ({ error, transparent, placeholder, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                selectionColor="secondary.500"
                placeholder={props.inputPlaceholder}
                {...styles.textInput}
                {...props}
                {...(props.multiline ? styles.overrideTextInput : null)}
            />
        )
    }
)

C_Input.displayName = 'Input'

const styles = {
    textInput: {
        height: 50,
        fontSize: 14,
        mb: 2,
        borderWidth: 2,
        borderRadius: 5,
        color: 'primary.500',
        bgColor: 'background.500',
        borderColor: 'muted.500',
    },
    overrideTextInput: {
        height: 100,
    },
}
