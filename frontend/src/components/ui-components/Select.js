//Code adapted from Native Base documentation example
//https://docs.nativebase.io/select
import React, { forwardRef } from 'react'
import { Select, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
export const C_Select = forwardRef(
    ({ error, transparent, selectOptions, ...props }, ref) => {
        return (
            <Select
                _selectedItem={{
                    my: 2,
                    bg: 'muted.500',
                    endIcon: <Icon as={Feather} name="check" size={5} />,
                }}
                placeholder={props.selectPlaceholder}
                placeholderTextColor={props.selectPlaceholderColor}
                accessibilityLabel={props.accessibilityLabel}
                selectionColor="secondary.500"
                {...props}
                {...styles.textInput}
            >
                {selectOptions.map((option) => {
                    return (
                        <Select.Item
                            key={option.key}
                            label={option.value}
                            value={option.value}
                        />
                    )
                })}
            </Select>
        )
    }
)

C_Select.displayName = 'Select'

const styles = {
    textInput: {
        height: 50,
        fontSize: 14,
        mb: 2,
        borderWidth: 2,
        borderRadius: 5,
    },
}
