import React from 'react'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'native-base'
import { globalStyles } from '../../../styles/global'
import FocusAwareStatusBar from '../../shared/navigation/FocusAwareStatusBar'

const Explore = () => {
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor="#ecf0f1"
            />
            <View style={globalStyles.view_container}>
                <Text>Explore Page</Text>
            </View>
        </SafeAreaView>
    )
}
export default Explore
