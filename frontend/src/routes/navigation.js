import * as React from 'react'
import { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
import FeedStackScreens from './stacks/feedStack'
import ExploreStackScreens from './stacks/exploreStack'
import AccountStackScreens from './stacks/accountStack'
import BagStackScreens from './stacks/bagStack'
import UserDashboardScreens from './stacks/userDashboardStack'
const Tab = createBottomTabNavigator()
export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel: () => {
                        return null
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused, size }) => {
                        if (route.name === 'Feed') {
                            if (focused) {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="activity"
                                        size={size}
                                        color="#000"
                                    />
                                )
                            } else {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="activity"
                                        size={size}
                                        color="#e0e0e0"
                                    />
                                )
                            }
                        }
                        if (route.name === 'Explore') {
                            if (focused) {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="search"
                                        size={size}
                                        color="#000"
                                    />
                                )
                            } else {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="search"
                                        size={size}
                                        color="#e0e0e0"
                                    />
                                )
                            }
                        }
                        if (route.name === 'Bag') {
                            if (focused) {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="shopping-bag"
                                        size={size}
                                        color="#000"
                                    />
                                )
                            } else {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="shopping-bag"
                                        size={size}
                                        color="#e0e0e0"
                                    />
                                )
                            }
                        }
                        if (route.name === 'User Dashboard') {
                            if (focused) {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="grid"
                                        size={size}
                                        color="#000"
                                    />
                                )
                            } else {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="grid"
                                        size={size}
                                        color="#e0e0e0"
                                    />
                                )
                            }
                        }
                        if (route.name === 'Account') {
                            if (focused) {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="user"
                                        size={size}
                                        color="#000"
                                    />
                                )
                            } else {
                                return (
                                    <Icon
                                        as={Feather}
                                        name="user"
                                        size={size}
                                        color="#e0e0e0"
                                    />
                                )
                            }
                        }
                    },
                })}
            >
                <Tab.Screen name="Feed" component={FeedStackScreens} />
                <Tab.Screen name="Explore" component={ExploreStackScreens} />
                <Tab.Screen name="Bag" component={BagStackScreens} />

                <Tab.Screen
                    name="User Dashboard"
                    component={UserDashboardScreens}
                />

                <Tab.Screen name="Account" component={AccountStackScreens} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
