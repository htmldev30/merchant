import React from 'react'
import PropTypes from 'prop-types'
import SelectCategory from '../../modules/userDashboard/create-product/selectCategory'

const SelectCategoryScreen = (props) => <SelectCategory {...props} />

SelectCategoryScreen.navigationOptions = () => ({
    header: null,
})

SelectCategoryScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SelectCategoryScreen
