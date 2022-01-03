import React from 'react'
import PropTypes from 'prop-types'
import CreateUserShop from '../../modules/account/create-user-shop/createUserShop'

const CreateUserShopScreen = (props) => <CreateUserShop {...props} />

CreateUserShopScreen.navigationOptions = () => ({
    header: null,
})

CreateUserShopScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default CreateUserShopScreen
