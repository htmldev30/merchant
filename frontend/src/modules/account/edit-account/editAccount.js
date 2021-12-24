import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'
import { globalStyles } from '../../../../styles/global'
import { UserProfileContext } from '../../../hooks/context/UserProfileProvider'
import EditAccountForm from './editAccountForm'
const EditAccount = ({ route, navigation }) => {
    const { setUserUpdated } = useContext(UserProfileContext)
    const { userProfile } = route.params
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor="#ecf0f1"
            />
            <EditAccountForm
                userProfile={userProfile}
                setUserUpdated={setUserUpdated}
                navigation={navigation}
            />
        </SafeAreaView>
    )
}

export default EditAccount
