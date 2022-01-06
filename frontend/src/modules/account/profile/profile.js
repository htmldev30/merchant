import React, { useContext } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { globalStyles } from '../../../../styles/global'
import { profileStyles } from '../../../../styles/profileStyles'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'

import Avatar from '../../../components/ui-components/Avatar'

import { View, Box, Text, Center, Stack, VStack } from 'native-base'
// Context
import { UserProfileContext } from '../../../hooks/context/UserProfileProvider'
import { UserShopContext } from '../../../hooks/context/UserShopProvider'
import BackgroundBanner from '../../../components/ui-components/user-shop/BackgroundBanner'

const Profile = (props) => {
    const { userProfile } = useContext(UserProfileContext)
    const { userShop } = useContext(UserShopContext)
    const navigationHandler = () => {
        props.navigation.navigate('Setting', {
            userProfile: userProfile,
            userShop: userShop,
        })
    }

    return (
        <SafeAreaView style={[globalStyles.container]}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor="#ecf0f1"
            />
            <View {...profileStyles.container}>
                <Box
                    {...(userShop
                        ? { ...profileStyles.shopHeader }
                        : { ...profileStyles.profileHeader })}
                >
                    <View {...profileStyles.avatarContainer}>
                        <TouchableOpacity onPress={navigationHandler}>
                            <BackgroundBanner
                                shopProfileBanner={
                                    userShop ? userShop.shopProfileBanner : null
                                }
                            >
                                <Avatar
                                    size="lg"
                                    avatarUrl={
                                        userShop
                                            ? userShop.shopProfilePicture
                                            : userProfile
                                            ? userProfile.avatar
                                            : null
                                    }
                                />
                            </BackgroundBanner>
                        </TouchableOpacity>
                    </View>
                    <Text {...profileStyles.displayName}>
                        {userShop
                            ? userShop.shopName
                            : userProfile
                            ? userProfile.displayName
                            : null}
                    </Text>

                    <Stack space={1} mb={2}>
                        <VStack>
                            <Center>
                                <Text {...profileStyles.shopSlogan}>
                                    {userShop
                                        ? userShop.shopSlogan
                                        : userProfile
                                        ? userProfile.bio
                                        : null}
                                </Text>
                            </Center>
                        </VStack>
                        {userShop ? (
                            <VStack>
                                <Center>
                                    <Text>{userShop.shopLocation}</Text>
                                </Center>
                            </VStack>
                        ) : null}
                    </Stack>

                    <View {...profileStyles.dataContainer}>
                        <View {...profileStyles.dataPointContainer}>
                            <View {...profileStyles.dataPointIcon}>
                                <Feather
                                    name="package"
                                    size={18}
                                    color="black"
                                />
                                <Text {...profileStyles.dataPointText}>24</Text>
                            </View>
                        </View>
                        <View {...profileStyles.dataPointContainer}>
                            <View {...profileStyles.dataPointIcon}>
                                <Feather name="star" size={18} color="black" />
                                <Text {...profileStyles.dataPointText}>24</Text>
                            </View>
                        </View>
                        <View {...profileStyles.dataPointContainer}>
                            <View {...profileStyles.dataPointIcon}>
                                <Feather name="eye" size={18} color="black" />
                                <Text {...profileStyles.dataPointText}>24</Text>
                            </View>
                        </View>
                    </View>
                </Box>
            </View>
        </SafeAreaView>
    )
}

export default Profile
