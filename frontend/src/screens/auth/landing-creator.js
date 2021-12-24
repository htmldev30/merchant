import React from 'react'
import { Heading, Text, Box } from 'native-base'

import { authNativeBaseStyles } from '../../../styles/authStyles'

export default function LandingCreator({ navigation }) {
    return (
        <Box {...authNativeBaseStyles.container}>
            <Heading {...authNativeBaseStyles.heading}>merchant</Heading>

            <Box {...authNativeBaseStyles.imageContainer}>
                <Box {...authNativeBaseStyles.contentContainer}>
                    <Heading {...authNativeBaseStyles.title}>
                        Sell Your Crafts
                    </Heading>
                    <Text {...authNativeBaseStyles.description}>
                        Merchant makes selling your small business goods easier.
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}
