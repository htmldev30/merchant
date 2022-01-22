import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../../screens/explore/index'
import ProductScreen from '../../screens/explore/ProductScreen'
const ExploreStack = createStackNavigator()
// explore - recommendation page
export const ExploreStackScreens = () => {
    return (
        <ExploreStack.Navigator>
            <ExploreStack.Screen name="Explore2" component={ExploreScreen} />
            <ExploreStack.Screen
                name="Product"
                component={ProductScreen}
                title="View Product"
            />
        </ExploreStack.Navigator>
    )
}
export default ExploreStackScreens
