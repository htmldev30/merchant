import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../../screens/explore/index'
const ExploreStack = createStackNavigator()
// explore - recommendation page
export const ExploreStackScreens = () => {
    return (
        <ExploreStack.Navigator>
            <ExploreStack.Screen name="Explore2" component={ExploreScreen} />
        </ExploreStack.Navigator>
    )
}
export default ExploreStackScreens
