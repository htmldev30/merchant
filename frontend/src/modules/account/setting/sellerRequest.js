import React from 'react'
import { SafeAreaView } from 'react-native'
import { View } from 'native-base'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'
import { globalStyles } from '../../../../styles/global'
import SellerRequestForm from './sellerRequestForm'
const SellerRequest = ({ navigation }) => {
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <View {...globalStyles.view_container}>
                <FocusAwareStatusBar
                    barStyle="dark-content"
                    backgroundColor="#ecf0f1"
                />
                <SellerRequestForm navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

export default SellerRequest
