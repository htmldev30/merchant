//Multiple image selection part of code adapted from GitHub user MonstroDev's expo-image-picker-multiple package example
//https://github.com/MonstroDev/expo-image-picker-multiple
import React, { useState, useEffect, useContext } from 'react'
import {
    Keyboard,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import CategoryWidget from '../../../components/ui-components/cards/CategoryWidget'
import { View, Text, HStack, Stack, VStack, Pressable } from 'native-base'
import { InputField } from '../../../components/form-fields/InputField'
import C_Button from '../../../components/ui-components/Button'
import { Formik } from 'formik'
import * as ImageManipulator from 'expo-image-manipulator'
import { ImageBrowser } from 'expo-image-picker-multiple'
import { getFileInfo } from '../../../shared/FileInformation'
import { getValueFor } from '../../../shared/UserAuthentication'
import axios from 'axios'
import { DeviceEventEmitter } from 'react-native'
import * as RootNavigation from '../../../shared/navigation/RootNavigation'
const SelectCategoryForm = ({ props }) => {
    // add to state and move with screen

    return (
        <Stack mt={60}>
            <VStack space={3} alignItems={'center'}>
                <HStack space={3} alignItems="center">
                    <Pressable
                        onPress={() =>
                            props.navigation.navigate('ProductInformation', {
                                category: 'Clothing',
                            })
                        }
                    >
                        <CategoryWidget
                            categoryTitle={'Clothing'}
                            categoryPreview={
                                'https://freepngimg.com/thumb/tshirt/4-2-t-shirt-png-file.png'
                            }
                            categoryColor={'amber'}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            props.navigation.navigate('ProductInformation', {
                                category: 'Beauty',
                            })
                        }
                    >
                        <CategoryWidget
                            categoryTitle={'Beauty'}
                            categoryPreview={
                                'https://www.pngall.com/wp-content/uploads/4/Soap-PNG-Image.png'
                            }
                            categoryColor={'tertiary'}
                        />
                    </Pressable>
                </HStack>
                <HStack space={3} alignItems="center">
                    <Pressable
                        onPress={() =>
                            props.navigation.navigate('ProductInformation', {
                                category: 'Accessories',
                            })
                        }
                    >
                        <CategoryWidget
                            categoryTitle={'Accessories'}
                            categoryPreview={
                                'https://cdn.shopify.com/s/files/1/0075/8526/7775/products/mockup-64c6cd49_1400x.png?v=1580973752'
                            }
                            categoryColor={'pink'}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            props.navigation.navigate('ProductInformation', {
                                category: 'Other',
                            })
                        }
                    >
                        <CategoryWidget
                            categoryTitle={'Other'}
                            categoryPreview={
                                'https://devstickers.com/assets/img/pro/4xd9.png'
                            }
                            categoryColor={'info'}
                        />
                    </Pressable>
                </HStack>
            </VStack>
        </Stack>
    )
}

const ProductInformationForm = ({ props }) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                productName: '',
                productDescription: '',
                productPrice: 0,
                productDetails: '',
            }}
            onSubmit={({
                productName,
                productDescription,
                productDetails,
                productPrice,
            }) => {
                props.navigation.navigate('ProductImageSelector', {
                    productInformation: {
                        productName: productName,
                        productDescription: productDescription,
                        productDetails: productDetails,
                        // uploaded user photos, and get uri from it
                        productPrice: productPrice,
                        productCategory: props.route.params['category'],
                    },
                })
                Keyboard.dismiss()
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View m={2} p={2}>
                    <InputField
                        label="Product Name"
                        name="productName"
                        value={values.productName}
                        onChangeText={handleChange('productName')}
                        onBlur={handleBlur('productName')}
                    />
                    <InputField
                        label="Product Description"
                        name="productDescription"
                        value={values.productDescription}
                        onChangeText={handleChange('productDescription')}
                        onBlur={handleBlur('productDescription')}
                    />
                    <InputField
                        label="Product Price"
                        name="productPrice"
                        value={values.productPrice.toString()}
                        onChangeText={handleChange('productPrice')}
                        onBlur={handleBlur('productPrice')}
                        keyboardType="numeric"
                    />
                    <InputField
                        label="Product Details"
                        name="productDetails"
                        multiline={true}
                        numberOfLines={4}
                        value={values.productDetails}
                        onChangeText={handleChange('productDetails')}
                        onBlur={handleBlur('productDetails')}
                    />

                    <C_Button title="Save & Review" onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    )
}

const SelectImagesForm = ({ props }) => {
    const _getHeaderLoader = () => (
        <ActivityIndicator size="small" color={'primary.500'} />
    )
    const imagesCallback = (callback) => {
        props.navigation.setOptions({
            headerRight: () => _getHeaderLoader(),
        })

        callback
            .then(async (productPhotos) => {
                const cProductPhotos = []
                for (let productPhoto of productPhotos) {
                    const productPhotoInfo = await _processImageAsync(
                        productPhoto.uri
                    )

                    const { size } = await getFileInfo(productPhotoInfo.uri)
                    cProductPhotos.push({
                        name: productPhoto.filename,
                        size: size,
                        uri: productPhotoInfo.uri,
                        type: 'application/' + 'image/png',
                    })
                }

                props.navigation.navigate('ReviewProductInformation', {
                    productInformation: {
                        ...props.route.params['productInformation'],
                        productPreview: cProductPhotos,
                    },
                })
            })
            .catch((e) => console.log(e))
    }

    const _processImageAsync = async (uri) => {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1000 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
        )
        return file
    }
    const _renderDoneButton = (count, onSubmit) => {
        if (!count) return null

        return (
            <TouchableOpacity onPress={onSubmit}>
                <Text color="primary.500" fontWeight={'700'} mr={5}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    const updateHandler = (count, onSubmit) => {
        props.navigation.setOptions({
            title: `${count} Images Selected`,
            headerRight: () => _renderDoneButton(count, onSubmit),
        })
    }

    const renderSelectedComponent = (number) => (
        <View
            px={8.6}
            py={1}
            borderRadius={5}
            position={'absolute'}
            right={3}
            bottom={3}
            justifyContent={'center'}
            bgColor="primary.500"
        >
            <Text
                fontWeight={'700'}
                alignSelf={'center'}
                p={'auto'}
                color={'#fff'}
            >
                {number}
            </Text>
        </View>
    )

    return (
        <View style={[imageSelectorStyles.flex, imageSelectorStyles.container]}>
            <ImageBrowser
                max={4}
                onChange={updateHandler}
                callback={imagesCallback}
                renderSelectedComponent={renderSelectedComponent}
                emptyStayComponent={<Text>Nothing Selected</Text>}
            />
        </View>
    )
}

const submitProduct = async (productInformation, productId) => {
    const token = await getValueFor('jwtToken')
    const shopCreatorId = await getValueFor('currentUserId')
    const shopId = await getValueFor('currentUserShopId')
    const allData = new FormData()
    allData.append('productName', productInformation.productName)
    allData.append('productCategory', productInformation.productCategory)
    allData.append('productDescription', productInformation.productDescription)
    allData.append('productPrice', productInformation.productPrice)
    allData.append('productDetails', productInformation.productDetails)
    allData.append(
        'userShopProductPictureFrontFile',
        productInformation.productPreview[0]
    )
    allData.append(
        'userShopProductPictureLeftFile',
        productInformation.productPreview[1]
    )
    allData.append(
        'userShopProductPictureRightFile',
        productInformation.productPreview[2]
    )
    allData.append(
        'userShopProductPictureBackFile',
        productInformation.productPreview[3]
    )

    allData.append('productId', productId)
    allData.append('shopId', shopId)
    allData.append('shopCreatorId', shopCreatorId)

    const response = await axios({
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
        },
        method: 'post',
        url: `http://192.168.0.9:3001/user-shop/${shopCreatorId}/${shopId}/create-new-product`,
        data: allData,
    })
        .then(function (response) {
            DeviceEventEmitter.emit('userShopProductsUpdated')
            RootNavigation.navigate('UserDashboard', {
                screen: 'Dashboard',
            })
            console.log('WORKING')
        })
        .catch(function (error) {
            console.log(error)
        })
}

const imageSelectorStyles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        position: 'relative',
    },
    emptyStay: {
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#0580FF',
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff',
    },
})

export {
    SelectCategoryForm,
    ProductInformationForm,
    SelectImagesForm,
    submitProduct,
}
