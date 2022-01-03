import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BagScreen from '../../screens/bag/index'
const BagStack = createStackNavigator()
export const BagStackScreens = () => {
    return (
        <BagStack.Navigator>
            <BagStack.Screen name="Bag2" component={BagScreen} />
        </BagStack.Navigator>
    )
}
export default BagStackScreens
