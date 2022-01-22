import React from 'react'
import { View, ScrollView, Text, Icon } from 'native-base'
import ExploreCard from '../../components/ui-components/cards/ExploreCard'
import { userDashboardStyles } from '../../../styles/userShopStyles'
import { Feather } from '@expo/vector-icons'
import * as RootNavigation from '../../shared/navigation/RootNavigation'
const ProductsScroll = ({ allUserShopProducts, scrollTitle }) => {
    const handleNavigationToProductPage = (product) => {
        RootNavigation.navigate('Explore', {
            screen: 'Product',
            params: { product: product },
        })
    }
    return (
        <View {...userDashboardStyles.scrollViewContainer}>
            <Text {...userDashboardStyles.scrollViewSectionalTitle}>
                <Icon
                    as={Feather}
                    name="trending-up"
                    size={5}
                    color="tertiary.700"
                />
                {scrollTitle}
            </Text>

            <View {...userDashboardStyles.scrollViewSectionalContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {allUserShopProducts.map((product) => (
                        <ExploreCard
                            productName={product.productName}
                            productPreview={product.productPictureFront}
                            productCategory={product.productCategory}
                            productPrice={product.productPrice}
                            key={product.productId}
                            navigateToProductPage={() =>
                                handleNavigationToProductPage(product)
                            }
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default ProductsScroll
