import React from 'react'

import Setting from '../../modules/account/setting/setting'
const SettingScreen = (props) => {
    return <Setting {...props} />
}

SettingScreen.navigationOptions = () => ({
    header: null,
})

export default SettingScreen
