import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Icon } from 'native-base'
import { globalStyles } from '../../../../styles/global'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'
import Avatar from '../../../components/ui-components/Avatar'
import { getValueFor } from '../../../shared/UserAuthentication'
import axios from 'axios'
import {
    View,
    Box,
    Text,
    Stack,
    VStack,
    HStack,
    Spinner,
    ScrollView,
    Pressable,
    Badge,
} from 'native-base'
import { settingStyles } from '../../../../styles/profileStyles'
import C_Button from '../../../components/ui-components/Button'
import WidgetCard from '../../../components/ui-components/cards/WidgetCard'
const Setting = ({ route, navigation }) => {
    const { userProfile, userShop } = route.params
    const [sellerRequest, setSellerRequest] = useState(null)
    useEffect(() => {
        checkSellerRequest()
    }, [])

    const checkSellerRequest = async () => {
        const token = await getValueFor('jwtToken')
        const currentUserId = await getValueFor('currentUserId')
        const response = await axios({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                authorization: `Bearer ${token}`,
            },
            method: 'get',
            url: `http://192.168.0.9:3001/user/seller-request/${currentUserId}`,
        })
            .then(function (response) {
                setSellerRequest(response.data.sellerRequest)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const navigationHandler = () => {
        navigation.navigate('EditAccount', { userProfile: userProfile })
    }
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <ScrollView {...settingStyles.container}>
                <FocusAwareStatusBar
                    barStyle="dark-content"
                    backgroundColor="#ecf0f1"
                />
                <View {...settingStyles.container}>
                    <Pressable onPress={navigationHandler}>
                        <Box {...settingStyles.profileHeader}>
                            <View {...settingStyles.avatarContainer}>
                                <Avatar
                                    size="lg"
                                    avatarUrl={userProfile.avatar}
                                />
                            </View>
                            <View {...settingStyles.userInfoContainer}>
                                <Text {...settingStyles.displayName}>
                                    {userProfile.displayName}
                                </Text>
                                <Text {...settingStyles.username}>
                                    @{userProfile.username}
                                </Text>
                                <Text {...settingStyles.bio}>
                                    {userProfile.bio}
                                </Text>
                            </View>
                        </Box>
                    </Pressable>

                    {userProfile.isVerified ? null : (
                        <Text ml={5} color="danger.500">
                            Email sent for Account Verification
                        </Text>
                    )}
                </View>

                <View height={'50px'} mx="3" mt="3">
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        bgColor={'white'}
                    >
                        <Stack>
                            <HStack space={3}>
                                <C_Button
                                    leftIcon={
                                        <Icon
                                            as={Feather}
                                            size={4}
                                            name="box"
                                        />
                                    }
                                    color="emerald"
                                    styles={{ w: '125px' }}
                                    title="Orders"
                                />
                                <C_Button
                                    leftIcon={
                                        <Icon
                                            as={Feather}
                                            size={4}
                                            name="inbox"
                                        />
                                    }
                                    color="warning"
                                    styles={{ w: '125px' }}
                                    title="Inbox"
                                />
                                <C_Button
                                    leftIcon={
                                        <Icon
                                            as={Feather}
                                            size={4}
                                            name="moon"
                                        />
                                    }
                                    color="indigo"
                                    styles={{ w: '125px' }}
                                    title="Status"
                                />
                                <C_Button
                                    leftIcon={
                                        <Icon
                                            as={Feather}
                                            size={4}
                                            name="eye"
                                        />
                                    }
                                    color="light"
                                    styles={{ w: '125px' }}
                                    title="Appearance"
                                />
                                <C_Button
                                    leftIcon={
                                        <Icon
                                            as={Feather}
                                            size={4}
                                            name="share"
                                        />
                                    }
                                    color="tertiary"
                                    styles={{ w: '125px' }}
                                    title="Share"
                                />
                            </HStack>
                        </Stack>
                    </ScrollView>
                </View>
                <View {...settingStyles.widgetBoxesContainer}>
                    <Stack space={3} alignItems="center">
                        {userProfile.isSeller ? (
                            <VStack space={3} alignItems="center">
                                <HStack space={5} alignItems="center">
                                    <WidgetCard
                                        bgColor={'primary.500'}
                                        icon={
                                            <Icon
                                                as={Feather}
                                                name="bar-chart-2"
                                                color="#fff"
                                            />
                                        }
                                    />
                                    <WidgetCard
                                        bgColor={'primary.500'}
                                        icon={
                                            <Icon
                                                as={Feather}
                                                name="shopping-bag"
                                                color="#fff"
                                            />
                                        }
                                        onPress={() =>
                                            navigation.navigate(
                                                'CreateUserShop',
                                                { userShop: userShop }
                                            )
                                        }
                                    />
                                    <WidgetCard
                                        bgColor={'primary.500'}
                                        icon={
                                            <Icon
                                                as={Feather}
                                                name="truck"
                                                color="#fff"
                                            />
                                        }
                                    />
                                </HStack>
                            </VStack>
                        ) : null}

                        <VStack space={3} alignItems="center">
                            <HStack space={5} alignItems="center">
                                <WidgetCard
                                    bgColor={'primary.500'}
                                    icon={
                                        <Icon
                                            as={Feather}
                                            name="settings"
                                            color="#fff"
                                        />
                                    }
                                />
                                <WidgetCard
                                    bgColor={'primary.500'}
                                    icon={
                                        <Icon
                                            as={Feather}
                                            name="headphones"
                                            color="#fff"
                                        />
                                    }
                                />
                                <WidgetCard
                                    bgColor={'primary.500'}
                                    icon={
                                        <Icon
                                            as={Feather}
                                            name="info"
                                            color="#fff"
                                        />
                                    }
                                />
                            </HStack>

                            {userProfile.isVerified ? (
                                <>
                                    {!sellerRequest ? (
                                        <HStack
                                            space={5}
                                            alignItems="center"
                                            mt={10}
                                        >
                                            <C_Button
                                                title="Become A Merchant!"
                                                size="lg"
                                                leftIcon={
                                                    <Icon
                                                        as={Feather}
                                                        name="shopping-bag"
                                                        size={5}
                                                    />
                                                }
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'SellerRequest'
                                                    )
                                                }
                                            />
                                        </HStack>
                                    ) : !sellerRequest.isApproved ? (
                                        <HStack
                                            space={5}
                                            alignItems="center"
                                            mt={10}
                                        >
                                            <Badge colorScheme="warning">
                                                Your Merchant request is still
                                                been processed.
                                            </Badge>
                                        </HStack>
                                    ) : sellerRequest.isApproved &&
                                      !userProfile.isSeller ? (
                                        <VStack
                                            space={5}
                                            alignItems="center"
                                            mt={10}
                                        >
                                            <Badge colorScheme="tertiary">
                                                Congratulations! You're now a
                                                Merchant!
                                            </Badge>

                                            <C_Button
                                                title="Setup Shop!"
                                                size="lg"
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'CreateUserShop',
                                                        { userShop: userShop }
                                                    )
                                                }
                                            />
                                        </VStack>
                                    ) : (
                                        <Spinner accessibilityLabel="Fetching" />
                                    )}
                                </>
                            ) : null}
                        </VStack>
                    </Stack>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Setting
