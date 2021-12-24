import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../../screens/explore/index'
const ExploreStack = createStackNavigator()
// explore - recomennded page
export const ExploreStackScreens = () => {
    return (
        <ExploreStack.Navigator>
            <ExploreStack.Screen name="Explore" component={ExploreScreen} />
        </ExploreStack.Navigator>
    )
}
export default ExploreStackScreens

