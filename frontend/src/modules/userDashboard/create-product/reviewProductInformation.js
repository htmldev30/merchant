import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../../../../styles/global'
import { View, Text, ScrollView, Badge, Center, Box } from 'native-base'
import ProductOverviewCard from '../../../components/ui-components/cards/ProductOverviewCard'
import SadGuySvg from '../../../../assets/svgs/Customs/SadGuy'
export default ReviewProductInformation = (props) => {
    const productInformation = props.route.params
        ? props.route.params['productInformation']
        : null

    // card with product info -like explore card but for whole page
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.view_container}>
                {productInformation ? (
                    <ScrollView scrollEventThrottle={16}>
                        <ProductOverviewCard
                            productName={productInformation.productName}
                            productDescription={
                                productInformation.productDescription
                            }
                            productDetails={productInformation.productDetails}
                            productPrice={productInformation.productPrice}
                            // front view, side view, back view
                            productPreview={productInformation.productPreview}
                            productCategory={productInformation.productCategory}
                        />
                    </ScrollView>
                ) : (
                    <Center>
                        <SadGuySvg
                            width="400"
                            height="275"
                            style={{ margin: '15%' }}
                        />
                        <Badge
                            colorScheme="danger"
                            _text={{ color: 'danger.500' }}
                        >
                            Hmm, you have to provide more information.
                        </Badge>
                    </Center>
                )}
            </View>
        </SafeAreaView>
    )
}
