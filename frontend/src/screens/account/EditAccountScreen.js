import React from 'react'
import PropTypes from 'prop-types'
import EditAccount from '../../modules/account/edit-account/editAccount'

const EditAccountScreen = (props) => <EditAccount {...props} />

EditAccountScreen.navigationOptions = () => ({
    header: null,
})

EditAccountScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default EditAccountScreen
