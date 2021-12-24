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

const CategoryWidget = ({ categoryTitle, categoryPreview, categoryColor }) => {
    return (
        <Box
            maxW="40"
            rounded="lg"
            overflow="hidden"
            mx={1}
            mx={1}
            bgColor={`${categoryColor}.400`}
        >
            <View>
                <AspectRatio w="100%" ratio={9 / 12}>
                    <ImageBackground
                        source={{
                            uri: categoryPreview,
                        }}
                    >
                        <Center
                            bg={'primary.500'}
                            _text={{
                                // _ is for children
                                fontWeight: '700',
                                fontSize: 'sm',
                                color: 'white',
                            }}
                            position="absolute"
                            bottom="0"
                            px="3"
                            py="1.5"
                        >
                            {categoryTitle}
                        </Center>
                    </ImageBackground>
                </AspectRatio>
            </View>
        </Box>
    )
}

export default CategoryWidget
