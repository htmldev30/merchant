import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../../../styles/global'
import {
    View,
    Text,
    ScrollView,
    Icon,
    HStack,
    Modal,
    Center,
    Button,
    Heading,
    Box,
    VStack,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import FocusAwareStatusBar from '../../shared/navigation/FocusAwareStatusBar'
import { userDashboardStyles } from '../../../styles/userShopStyles'
import C_Button from '../../components/ui-components/Button'
import ReviewCard from '../../components/ui-components/cards/ReviewCard'
import ProductsScroll from './productsScroll'
import { UserShopProductContext } from '../../hooks/context/UserShopProductProvider'
const Dashboard = ({ navigation }) => {
    const { allUserShopProducts } = useContext(UserShopProductContext)
    const [showModal, setShowModal] = useState(false)
    const navigationHandler = () => {
        navigation.navigate('CreateProductScreens')
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <FocusAwareStatusBar
                barStyle="dark-content"
                backgroundColor="#ecf0f1"
            />
            <View style={globalStyles.view_container}>
                {!allUserShopProducts.length ? null : (
                    <ScrollView scrollEventThrottle={16}>
                        <ProductsScroll
                            scrollTitle="All Products"
                            allUserShopProducts={allUserShopProducts}
                        />
                    </ScrollView>
                )}

                <HStack pt={2} alignItems="center" safeAreaBottom>
                    <C_Button
                        onPress={() => setShowModal(true)}
                        styles={{ w: '25%', h: '40px', borderRadius: 0 }}
                        leftIcon={
                            <Icon as={Feather} name="message-square" size={6} />
                        }
                    />

                    <C_Button
                        title="New Product"
                        onPress={navigationHandler}
                        styles={{ w: '75%', h: '40px', borderRadius: 0 }}
                    />
                </HStack>
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    size={'xl'}
                    shadow={5}
                    animationPreset="slide"
                >
                    <Modal.Content maxWidth="400px" bgColor={'white'}>
                        <Modal.Header style={{ borderBottomWidth: 0 }}>
                            <Heading color={'primary.500'} size={'md'}>
                                Reviews
                            </Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <ScrollView>
                                <VStack flex={1} space={2}>
                                    <ReviewCard
                                        reviewAuthor="James"
                                        stars={5}
                                        reviewDescription={
                                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                                        }
                                    />
                                </VStack>
                            </ScrollView>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </View>
        </SafeAreaView>
    )
}
export default Dashboard
