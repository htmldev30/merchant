import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../../screens/userShop/DashboardScreen'
import SelectCategoryScreen from '../../screens/userShop/SelectCategoryScreen'
import ProductInformationScreen from '../../screens/userShop/ProductInformationScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { Icon, Text } from 'native-base'
import ReviewProductInformationScreen from '../../screens/userShop/ReviewProductInformationScreen'
import SelectImagesScreen from '../../screens/userShop/SelectImagesScreen'
import { TouchableOpacity } from 'react-native-gesture-handler'
const createProductTabs = createBottomTabNavigator()
const userDashboardStack = createStackNavigator()
export const CreateProductScreens = () => {
    return (
        <createProductTabs.Navigator
            screenOptions={({ navigation, route }) => ({
                headerLeft: () => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Dashboard')}
                        >
                            <Text color="primary.500" fontWeight={'700'} ml={5}>
                                Go back
                            </Text>
                        </TouchableOpacity>
                    )
                },
                tabBarLabel: () => {
                    return null
                },
                tabBarStyle: {
                    alignSelf: 'center',
                    width: '100%',
                },
                headerShown: true,
                tabBarIcon: ({ focused, size }) => {
                    if (focused) {
                        return (
                            <Icon
                                as={Feather}
                                name="circle"
                                size={size}
                                color="#000"
                            />
                        )
                    } else {
                        return (
                            <Icon
                                as={Feather}
                                name="circle"
                                size={size}
                                color="#e0e0e0"
                            />
                        )
                    }
                },
            })}
        >
            <createProductTabs.Screen
                name="SelectCategory"
                component={SelectCategoryScreen}
                options={{ title: 'Select Category' }}
            />
            <createProductTabs.Screen
                name="ProductInformation"
                component={ProductInformationScreen}
                options={{ title: 'Product Information' }}
            />
            <createProductTabs.Screen
                name="ProductImageSelector"
                component={SelectImagesScreen}
                options={{ title: 'Select Images' }}
            />
            <createProductTabs.Screen
                name="ReviewProductInformation"
                component={ReviewProductInformationScreen}
                options={{ title: 'Review Product ' }}
            />
        </createProductTabs.Navigator>
    )
}

export const UserDashboardScreens = () => {
    return (
        <NavigationContainer independent={true}>
            <userDashboardStack.Navigator>
                <userDashboardStack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                />
                <userDashboardStack.Screen
                    name="CreateProductScreens"
                    component={CreateProductScreens}
                    options={{ headerShown: false }}
                />
            </userDashboardStack.Navigator>
        </NavigationContainer>
    )
}

export default UserDashboardScreens
