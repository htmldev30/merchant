//Code adapted from Elijah Trillionz Dev.to Tutorial Article
//https://dev.to/elijahtrillionz/complete-guide-on-how-to-use-styled-components-in-react-360c
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Image = styled.Image`
    border-width: 2px;
    border-radius: ${(props) => (props.size === 'sm' ? '10px' : '18px')};
    height: ${(props) =>
        props.size === 'sm' ? '40px' : props.size === 'lg' ? '100px' : '60px'};
    width: ${(props) =>
        props.size === 'sm' ? '40px' : props.size === 'lg' ? '100px' : '60px'};
`

const Avatar = ({ size = 'sm', avatarUrl }) => (
    <Image size={size} source={{ uri: avatarUrl }} resizeMode="cover" />
)

Avatar.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
}

export default Avatar
