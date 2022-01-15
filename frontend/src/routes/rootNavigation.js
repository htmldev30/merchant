import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthNavigation from './authNavigation'
import AppNavigation from './appNavigation'
const RootStack = createStackNavigator()

export default RootStackScreen = ({ isAuthenticated }) => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <RootStack.Screen
                    component={AppNavigation}
                    name="App"
                    options={{
                        animationEnabled: false,
                    }}
                />
            ) : (
                <RootStack.Screen
                    component={AuthNavigation}
                    name="Authentication"
                    options={{
                        animationEnabled: false,
                    }}
                />
            )}
        </RootStack.Navigator>
    )
}
