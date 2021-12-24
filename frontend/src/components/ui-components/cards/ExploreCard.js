import React from 'react'
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

const ExploreCard = ({
    productName,
    productPreview,
    productCategory,
    productPrice,
    productDiscounted = false,
}) => {
    return (
        <Box
            maxW="40"
            rounded="lg"
            overflow="hidden"
            mx={1}
            bgColor={'white'}
            borderWidth={0.2}
            borderColor={'secondary.500'}
        >
            <Box>
                <AspectRatio w="100%" ratio={9 / 9}>
                    <Image
                        source={{
                            uri: productPreview,
                        }}
                        alt="product_image"
                    />
                </AspectRatio>
                <Center
                    bg={productDiscounted ? 'danger.700' : 'tertiary.700'}
                    _text={{
                        // _ is for children
                        fontWeight: '700',
                        fontSize: 'xs',
                    }}
                    position="absolute"
                    bottom="0"
                    px="3"
                    py="1.5"
                >
                    {`$${productPrice}`}
                </Center>
            </Box>
            <Stack p="3" space={3}>
                <Stack space={3}>
                    <Heading size="sm" ml="-1" color="primary.500" height="10">
                        {productName}
                    </Heading>
                    <HStack alignItems="center" safeAreaBottom>
                        <Text color="primary.700" fontWeight="400">
                            {productCategory}
                        </Text>
                    </HStack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ExploreCard
