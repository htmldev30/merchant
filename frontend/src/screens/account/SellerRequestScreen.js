import React from 'react'
import PropTypes from 'prop-types'
import SellerRequest from '../../modules/account/setting/sellerRequest'

const SellerRequestScreen = (props) => <SellerRequest {...props} />

SellerRequestScreen.navigationOptions = () => ({
    header: null,
})

SellerRequestScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SellerRequestScreen
