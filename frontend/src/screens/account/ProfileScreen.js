import React from 'react'

import Profile from '../../modules/account/profile/profile'
const ProfileScreen = (props) => {
    return <Profile {...props} />
}

ProfileScreen.navigationOptions = () => ({
    header: null,
})

export default ProfileScreen
