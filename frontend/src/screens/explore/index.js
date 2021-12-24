import React from 'react'

import Explore from '../../modules/explore/explore'
const ExploreScreen = (props) => {
    return <Explore {...props} />
}

ExploreScreen.navigationOptions = () => ({
    header: null,
})

export default ExploreScreen
