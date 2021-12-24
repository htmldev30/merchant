import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../../../../styles/global'
import { View } from 'native-base'
import { SelectCategoryForm } from './createProductForms'

const SelectCategory = (props) => {
    // add data to navigation props and stuff, till the last page, then submit all that data
    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.view_container}>
                <SelectCategoryForm props={props} />
            </View>
        </SafeAreaView>
    )
}

export default SelectCategory
