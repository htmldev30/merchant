import React from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { ListItem } from 'react-native-elements'
import { Icon } from 'native-base'
import { globalStyles } from '../../../../styles/global'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'
import { Divider } from 'native-base'
import Avatar from '../../../components/ui-components/Avatar'
import { View, Box, Pressable, Text } from 'native-base'
import { settingStyles } from '../../../../styles/profileStyles'

const Setting = ({ route, navigation }) => {
    const { userProfile } = route.params
    const navigationHandler = () => {
        navigation.navigate('EditAccount', { userProfile: userProfile })
    }
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <ScrollView>
                <FocusAwareStatusBar
                    barStyle="dark-content"
                    backgroundColor="#ecf0f1"
                />
                <View {...settingStyles.container}>
                    <Box {...settingStyles.profileHeader}>
                        <View {...settingStyles.avatarContainer}>
                            <Avatar size="lg" avatarUrl={userProfile.avatar} />
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
                    {userProfile.isVerified ? null : (
                        <Text {...settingStyles.dangerText}>
                            Please verify your account
                        </Text>
                    )}
                </View>

                <View {...settingStyles.listContainer}>
                    <Divider {...settingStyles.divider} />
                    <Text {...settingStyles.listDividerText}> Dashboard </Text>
                    <Pressable onPress={navigationHandler}>
                        <ListItem
                            containerStyle={settingStyles.listenItemContainer}
                        >
                            <View {...settingStyles.iconContainer}>
                                <Icon
                                    as={Feather}
                                    name="user"
                                    size={8}
                                    color={settingStyles.iconColor.color}
                                />
                            </View>

                            <ListItem.Content>
                                <ListItem.Title style={settingStyles.listItem}>
                                    Account
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Setting
