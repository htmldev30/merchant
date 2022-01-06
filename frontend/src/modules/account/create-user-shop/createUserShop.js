import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { View } from 'native-base'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'
import { globalStyles } from '../../../../styles/global'
import CreateUserShopForm from './createUserShopForm.js'
import { UserShopContext } from '../../../hooks/context/UserShopProvider'
const CreateUserShop = ({ route, navigation }) => {
    const { userShop } = route.params
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <View {...globalStyles.view_container}>
                <FocusAwareStatusBar
                    barStyle="dark-content"
                    backgroundColor="#ecf0f1"
                />
                <CreateUserShopForm
                    userShop={userShop}
                    navigation={navigation}
                />
            </View>
        </SafeAreaView>
    )
}

export default CreateUserShop
