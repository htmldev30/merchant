import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../../screens/account/ProfileScreen'
import SettingScreen from '../../screens/account/SettingScreen'
import EditAccountScreen from '../../screens/account/EditAccountScreen'
const AccountStack = createStackNavigator()
export const AccountStackScreens = () => {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen name="Profile" component={ProfileScreen} />
            <AccountStack.Screen name="Setting" component={SettingScreen} />
            <AccountStack.Screen
                name="EditAccount"
                component={EditAccountScreen}
                options={{ title: 'Edit Account' }}
            />
        </AccountStack.Navigator>
    )
}
export default AccountStackScreens
