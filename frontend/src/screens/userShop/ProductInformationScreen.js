import React from 'react'
import PropTypes from 'prop-types'
import ProductInformation from '../../modules/userDashboard/create-product/productInformation'

const ProductInformationScreen = (props) => <ProductInformation {...props} />

ProductInformationScreen.navigationOptions = () => ({
    header: null,
})

ProductInformationScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default ProductInformationScreen
