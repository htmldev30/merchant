import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../../../../styles/global'
import { View } from 'native-base'
import { SelectImagesForm } from './createProductForms'
export default SelectImages = (props) => {
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.view_container}>
                <SelectImagesForm props={props} />
            </View>
        </SafeAreaView>
    )
}
