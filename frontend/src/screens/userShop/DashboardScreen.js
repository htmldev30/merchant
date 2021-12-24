import React from 'react'

import Dashboard from '../../modules/userDashboard/dashboard'
const DashboardScreen = (props) => {
    return <Dashboard {...props} />
}

DashboardScreen.navigationOptions = () => ({
    header: null,
})

export default DashboardScreen
