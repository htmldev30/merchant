import React from 'react'
import { Box, Heading, Text } from 'native-base'
import { authNativeBaseStyles } from '../../../styles/authStyles'
export default function Landing({ navigation }) {
    return (
        <>
            <Box {...authNativeBaseStyles.container}>
                <Heading
                    {...authNativeBaseStyles.heading}
                    color={'primary.500'}
                >
                    merchant
                </Heading>

                <Box {...authNativeBaseStyles.imageContainer}>
                    <Box {...authNativeBaseStyles.contentContainer}>
                        <Heading {...authNativeBaseStyles.title}>
                            Buy small business
                        </Heading>
                        <Text {...authNativeBaseStyles.description}>
                            Welcome to Merchant and join our community of small
                            businesses.
                        </Text>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
