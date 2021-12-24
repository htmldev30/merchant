import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FeedScreen from '../../screens/feed/index'
const FeedStack = createStackNavigator()
export const FeedStackScreens = () => {
    return (
        <FeedStack.Navigator>
            <FeedStack.Screen name="Feed" component={FeedScreen} />
        </FeedStack.Navigator>
    )
}
export default FeedStackScreens
