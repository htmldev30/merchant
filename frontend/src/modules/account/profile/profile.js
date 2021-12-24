import React, { useContext } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { globalStyles } from '../../../../styles/global'
import { profileStyles } from '../../../../styles/profileStyles'
import FocusAwareStatusBar from '../../../shared/navigation/FocusAwareStatusBar'

import Avatar from '../../../components/ui-components/Avatar'

import { View, Box, Text } from 'native-base'
// Context
import { UserProfileContext } from '../../../hooks/context/UserProfileProvider'

const Profile = (props) => {
    const { userProfile } = useContext(UserProfileContext)
    const navigationHandler = () => {
        props.navigation.navigate('Setting', { userProfile: userProfile })
    }
    return (
        <SafeAreaView style={[globalStyles.container]}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor="#ecf0f1"
            />
            <View {...profileStyles.container}>
                <Box {...profileStyles.profileHeader}>
                    <View {...profileStyles.avatarContainer}>
                        <TouchableOpacity onPress={navigationHandler}>
                            <Avatar size="lg" avatarUrl={userProfile.avatar} />
                        </TouchableOpacity>
                    </View>
                    <Text {...profileStyles.displayName}>
                        {userProfile.displayName}
                    </Text>
                    <Text {...profileStyles.bio}>{userProfile.bio}</Text>
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
