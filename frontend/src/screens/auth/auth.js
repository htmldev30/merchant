import React, { useContext } from 'react'
import C_Button from '../../components/ui-components/Button'
import { Heading, Box } from 'native-base'
// Customs
import { authNativeBaseStyles } from '../../../styles/authStyles'
import { AuthenticationContext } from '../../hooks/context/AuthenticationProvider'

export default function Auth() {
    const { authenticate } = useContext(AuthenticationContext)
    return (
        <Box {...authNativeBaseStyles.container}>
            <Heading {...authNativeBaseStyles.heading}>merchant</Heading>

            <Box {...authNativeBaseStyles.container}>
                <Box {...authNativeBaseStyles.contentContainer}>
                    <Heading {...authNativeBaseStyles.title}>
                        Sign up to merchant
                    </Heading>
                </Box>
                <Box {...authNativeBaseStyles.bottomContainer}>
                    <C_Button
                        title="Sign Up"
                        size="lg"
                        onPress={authenticate}
                    />
                </Box>
            </Box>
        </Box>
    )
}
