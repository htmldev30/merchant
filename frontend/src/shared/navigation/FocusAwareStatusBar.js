# Code adapted from React Navigation Documentation Example
# https://reactnavigation.org/docs/use-is-focused/
import React from 'react'
import { StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

export default function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused()

    return isFocused ? <StatusBar {...props} /> : null
}
