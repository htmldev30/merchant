import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../../../../styles/global'
import { View } from 'native-base'
import { ProductInformationForm } from './createProductForms'
export default ProductInformation = (props) => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.view_container}>
                <ProductInformationForm props={props} />
            </View>
        </SafeAreaView>
    )
}
