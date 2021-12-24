import React from 'react'
import PropTypes from 'prop-types'
import SelectImages from '../../modules/userDashboard/create-product/selectImages'

const SelectImagesScreen = (props) => <SelectImages {...props} />

SelectImagesScreen.navigationOptions = () => ({
    header: null,
})

SelectImagesScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SelectImagesScreen
