# Code adapted from Formik Example
# https://formik.org/docs/api/useField
import React from 'react'
import { useField } from 'formik'
import { C_Input } from '../ui-components/Input'
import InputErrorMessage from '../ui-components/InputErrorMessage'
import { View, Text } from 'native-base'

export const InputField = ({
    label,
    alert,
    errorMsg,
    ref: _,
    className,
    ...props
}) => {
    const [field, meta] = useField(props)
    return (
        <View>
            {label & alert ? (
                <Text color="danger.500">{label}</Text>
            ) : label ? (
                <Text>{label}</Text>
            ) : null}
            <C_Input error={meta.error} {...props} />
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
