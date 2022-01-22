import React from 'react'

import Product from '../../modules/explore/product'
const ProductScreen = (props) => {
    return <Product {...props} />
}

ProductScreen.navigationOptions = () => ({
    header: null,
})

export default ProductScreen
