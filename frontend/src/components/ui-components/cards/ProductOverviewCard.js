//Carousel Section of Code Adapted From GitHub user Meliorence's open source react-native-snap-carousel package example
//https://github.com/meliorence/react-native-snap-carousel#example
import React, { useState, useRef } from 'react'
import { Dimensions } from 'react-native'
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    VStack,
    Stack,
} from 'native-base'
import Carousel from 'react-native-snap-carousel'
const ProductOverviewCard = ({
    productName,
    productDescription,
    productDetails,
    productPreview,
    productCategory,
    productPrice,
}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const ref = useRef(null)
    const renderItem = ({ item }) => {
        return (
            <AspectRatio w="100%" ratio={9 / 9}>
                <Image
                    source={{
                        uri: item.uri,
                    }}
                    key={item.name}
                    alt="product_image"
                />
            </AspectRatio>
        )
    }
    const sliderWidth = Dimensions.get('window').width
    const horizontalMargin = 20
    const slideWidth = 280
    const itemWidth = slideWidth + horizontalMargin * 2

    const renderCarousel = () => {
        return (
            <Carousel
                layout={'default'}
                ref={ref}
                data={productPreview}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveIndex({ index })}
            />
        )
    }

    return (
        <Box maxW="100%" overflow="hidden" bgColor={'white'}>
            <Box>
                {renderCarousel()}
                <Center
                    bg={'tertiary.700'}
                    _text={{
                        // _ is for children
                        fontWeight: '700',
                        fontSize: 'xs',
                    }}
                    position="absolute"
                    bottom="0"
                    px="10"
                    py="1.5"
                >
                    {`$${productPrice}`}
                </Center>
            </Box>
            <Stack p="3" space={2}>
                <Stack space={2}>
                    <Heading size="md" ml="-1" color="primary.500" height="8">
                        {productName}
                    </Heading>
                    <VStack space={1} safeAreaBottom>
                        <Text color="primary.700" fontWeight="400">
                            {productDescription}
                        </Text>

                        <Text color="primary.700" fontWeight="400">
                            {productDetails}
                        </Text>
                        <Text color="primary.700" fontWeight="700">
                            {productCategory}
                        </Text>
                    </VStack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ProductOverviewCard
