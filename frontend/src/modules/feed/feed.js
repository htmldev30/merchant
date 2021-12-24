import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { globalStyles } from '../../../styles/global'
import FocusAwareStatusBar from '../../shared/navigation/FocusAwareStatusBar'

const Feed = () => {
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor="#ecf0f1"
            />
            <View style={globalStyles.view_container}>
                <Text>Feed Page</Text>
            </View>
        </SafeAreaView>
    )
}

export default Feed
