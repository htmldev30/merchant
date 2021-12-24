import React from 'react'

import Feed from '../../modules/feed/feed'
const FeedScreen = (props) => {
    return <Feed {...props} />
}

FeedScreen.navigationOptions = () => ({
    header: null,
})

export default FeedScreen
