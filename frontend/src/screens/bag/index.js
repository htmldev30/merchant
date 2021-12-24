import React from 'react'

import Bag from '../../modules/bag/bag'
const BagScreen = (props) => {
    return <Bag {...props} />
}

BagScreen.navigationOptions = () => ({
    header: null,
})

export default BagScreen
