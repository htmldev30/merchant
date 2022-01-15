import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import C_Button from '../../components/ui-components/Button'
import { globalStyles } from '../../../styles/global'
import FocusAwareStatusBar from '../../shared/navigation/FocusAwareStatusBar'
import { auth, signOut } from '../../firebase'
import { CommonActions } from '@react-navigation/native'

const Feed = ({ navigation }) => {
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor="#ecf0f1"
            />
            <View style={globalStyles.view_container}>
                <Text>Feed Page</Text>
                <C_Button title="Logout" onPress={() => signOut(auth)} />
            </View>
        </SafeAreaView>
    )
}

export default Feed
