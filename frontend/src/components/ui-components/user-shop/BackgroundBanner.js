import React from 'react'
import { ImageBackground } from 'react-native'
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    View,
} from 'native-base'

const BackgroundBanner = ({ shopProfileBanner, children }) => {
    return (
        <Box rounded="lg" maxH={40} overflow="hidden">
            <View>
                <AspectRatio w="100%" ratio={9 / 4}>
                    <ImageBackground
                        source={{
                            uri: shopProfileBanner,
                        }}
                    >
                        <Center bottom="0" px="3" py="12">
                            {children}
                        </Center>
                    </ImageBackground>
                </AspectRatio>
            </View>
        </Box>
    )
}

export default BackgroundBanner
