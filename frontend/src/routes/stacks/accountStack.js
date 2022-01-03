import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../../screens/account/ProfileScreen'
import SettingScreen from '../../screens/account/SettingScreen'
import EditAccountScreen from '../../screens/account/EditAccountScreen'
import SellerRequestScreen from '../../screens/account/SellerRequestScreen'
import CreateUserShopScreen from '../../screens/account/CreateUserShopScreen'
const AccountStack = createStackNavigator()
export const AccountStackScreens = () => {
    return (
        <AccountStack.Navigator>
            {/* profile can have wishlist and likes and tracking packages */}
            <AccountStack.Screen name="Profile" component={ProfileScreen} />
            <AccountStack.Screen name="Setting" component={SettingScreen} />
            <AccountStack.Screen
                name="EditAccount"
                component={EditAccountScreen}
                options={{ title: 'Edit Account' }}
            />
            <AccountStack.Screen
                name="SellerRequest"
                component={SellerRequestScreen}
                options={{ title: 'Become A Merchant' }}
            />
            <AccountStack.Screen
                name="CreateUserShop"
                component={CreateUserShopScreen}
                options={{ title: 'Shop Details' }}
            />
        </AccountStack.Navigator>
    )
}
export default AccountStackScreens
