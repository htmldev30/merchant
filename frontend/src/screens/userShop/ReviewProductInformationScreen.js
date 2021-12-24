import React from 'react'
import PropTypes from 'prop-types'
import ReviewProductInformation from '../../modules/userDashboard/create-product/reviewProductInformation'

const ReviewProductInformationScreen = (props) => (
    <ReviewProductInformation {...props} />
)

ReviewProductInformationScreen.navigationOptions = () => ({
    header: null,
})

ReviewProductInformationScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default ReviewProductInformationScreen
