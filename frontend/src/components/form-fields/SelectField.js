import React from 'react'
import { useField } from 'formik'
import { C_Select } from '../ui-components/Select'
import InputErrorMessage from '../ui-components/InputErrorMessage'
import { View, Text } from 'react-native'

export const SelectField = ({
    label,
    errorMsg,
    ref: _,
    selectOptions,
    ...props
}) => {
    const [field, meta] = useField(props)
    return (
        <View>
            {label ? <Text>{label}</Text> : null}
            <C_Select
                error={meta.error}
                selectOptions={selectOptions}
                {...props}
            />
            {meta.error && meta.touched ? (
                <View>
                    <InputErrorMessage>
                        {errorMsg || meta.error}
                    </InputErrorMessage>
                </View>
            ) : null}
        </View>
    )
}
