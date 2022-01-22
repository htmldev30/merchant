import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../../../styles/global'
import { View, Text, ScrollView, Badge, Center, Box } from 'native-base'
import ProductOverviewCard from '../../components/ui-components/cards/ProductOverviewCard'

export default Product = (props) => {
    const productInformation = props.route.params
        ? props.route.params['product']
        : null
    const productPreviewFiles = {
        productPictureFront: {
            name: 'productPictureFront',
            uri: productInformation.productPictureFront,
        },
        productPictureLeft: {
            name: 'productPictureLeft',
            uri: productInformation.productPictureLeft,
        },
        productPictureRight: {
            name: 'productPictureRight',
            uri: productInformation.productPictureRight,
        },
        productPictureBack: {
            name: 'productPictureBack',
            uri: productInformation.productPictureBack,
        },
    }
    const productPreview = []
    Object.keys(productPreviewFiles).forEach(function (key, index) {
        productPreview.push(productPreviewFiles[key])
    })
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.view_container}>
                <ScrollView scrollEventThrottle={16}>
                    <ProductOverviewCard
                        productName={productInformation.productName}
                        productDescription={
                            productInformation.productDescription
                        }
                        productDetails={productInformation.productDetails}
                        productPrice={productInformation.productPrice}
                        // front view, side view, back view
                        productPreview={productPreview}
                        productCategory={productInformation.productCategory}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
