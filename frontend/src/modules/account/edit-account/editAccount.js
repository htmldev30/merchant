import React, { useContext } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { View } from 'native-base'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'
import { globalStyles } from '../../../../styles/global'
import { UserProfileContext } from '../../../hooks/context/UserProfileProvider'
import EditAccountForm from './editAccountForm'
const EditAccount = ({ route, navigation }) => {
    const { setUserUpdated } = useContext(UserProfileContext)
    const { userProfile } = route.params
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <ScrollView>
                <View {...globalStyles.view_container}>
                    <FocusAwareStatusBar
                        barStyle="dark-content"
                        backgroundColor="#ecf0f1"
                    />
                    <EditAccountForm
                        userProfile={userProfile}
                        setUserUpdated={setUserUpdated}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditAccount
