import React from 'react'
import { Box, HStack, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
export default ReviewCard = ({ reviewAuthor, stars, reviewDescription }) => {
    earnedStars = []
    const alludedStars = () => {
        for (i = 0; i < 5; i++) {
            if (i < stars) {
                earnedStars.push(
                    <Icon
                        as={Feather}
                        name="star"
                        size={4}
                        color="amber.500"
                        key={i}
                    />
                )
            } else {
                earnedStars.push(
                    <Icon
                        as={Feather}
                        name="star"
                        size={4}
                        color="highlight.500"
                        key={i}
                    />
                )
            }
        }
    }
    alludedStars()
    return (
        <Box borderWidth={0.5} borderRadius="md" borderColor={'secondary.500'}>
            <Box pt="2" px="2" _text={{ color: 'primary.500' }}>
                <HStack>
                    {earnedStars.map((star, i) => (
                        <Icon
                            as={star.props.as}
                            color={star.props.color}
                            name={star.props.name}
                            size={star.props.size}
                            key={i}
                        />
                    ))}
                </HStack>
            </Box>
            <Box px="2" _text={{ color: 'primary.500' }}>
                {reviewDescription}
            </Box>
            <Box
                px="4"
                pb="2"
                _text={{
                    color: 'primary.500',
                    fontWeight: '500',
                }}
            >
                {`~ ${reviewAuthor}`}
            </Box>
        </Box>
    )
}
