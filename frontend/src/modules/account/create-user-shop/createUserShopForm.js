import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { View, Text } from 'native-base'
import * as ImagePicker from 'expo-image-picker'

// Customs
import { getValueFor } from '../../../shared/UserAuthentication'
import { InputField } from '../../../components/form-fields/InputField'
import C_Button from '../../../components/ui-components/Button'
import { getFileInfo } from '../../../shared/FileInformation'

export default CreateUserShopForm = ({
    navigation,
    userShop,
    setUserShopUpdated,
}) => {
    const [responseMessage, setResponseMessage] = useState(null)
    const [errors, setErrors] = useState(null)
    // const existingUserShopValues = {
    //     shopName: userShop.shopName,
    //     shopCategory: userShop.shopCategory,
    //     shopDescription: userShop.shopDescription,
    //     shopSlogan: userShop.shopSlogan,
    //     shopLocation: userShop.shopLocation,
    // }
    const [
        selectedUserShopProfilePictureFile,
        setSelectedUserShopProfilePictureFile,
    ] = useState({
        userShopProfilePictureFile: undefined,
        userShopProfilePicturePreviewURI: undefined,
    })
    const [
        selectedUserShopProfileBannerFile,
        setSelectedUserShopProfileBannerFile,
    ] = useState({
        userShopProfileBannerFile: undefined,
        userShopProfileBannerPreviewURI: undefined,
    })

    useEffect(() => {
        ;(async () => {
            if (Platform.OS !== 'web') {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== 'granted') {
                    alert(
                        'Sorry, Camera roll permissions are required to make this work!'
                    )
                }
            }
        })()
    }, [])

    const pickUserShopProfilePictureFile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            const userShopProfilePictureFileInfo = await getFileInfo(result.uri)
            // required EXACT
            var fileToUpload = {
                name: userShopProfilePictureFileInfo.uri,
                size: userShopProfilePictureFileInfo.size,
                uri: userShopProfilePictureFileInfo.uri,
                type: 'application/' + result.type,
            }
            setSelectedUserShopProfilePictureFile(fileToUpload)
        }
    }
    const pickUserShopProfileBannerFile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            const userShopProfileBannerFileInfo = await getFileInfo(result.uri)
            // required EXACT
            var fileToUpload = {
                name: userShopProfileBannerFileInfo.uri,
                size: userShopProfileBannerFileInfo.size,
                uri: userShopProfileBannerFileInfo.uri,
                type: 'application/' + result.type,
            }
            setSelectedUserShopProfileBannerFile(fileToUpload)
        }
    }
    const userShopValidationSchema = Yup.object({
        shopName: Yup.string()
            .matches(/^[ A-Za-zñáéíóúü0-9_.-]*$/, 'You may only use _ . - ')
            .matches(/^(?![0-9_.-]+$)/, 'Letters are required') // if matches regex
            .min(2, 'Shop name must be longer')
            .max(32, 'Shop name is too long')
            .required('Shop name cannot be left blank'),
        shopCategory: Yup.string().max(32, 'Shop Category too long.'),
        shopDescription: Yup.string().max(256, 'Shop Details is too long'),
        shopSlogan: Yup.string().max(64, 'Shop Slogan is too long'),
        shopLocation: Yup.string(),
    })

    const navigationHandler = () => {
        navigation.navigate('Profile')
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={
                userShop
                    ? {
                          shopName: userShop.shopName,
                          shopCategory: userShop.shopCategory,
                          shopDescription: userShop.shopDescription,
                          shopSlogan: userShop.shopSlogan,
                          shopLocation: userShop.shopLocation,
                      }
                    : {
                          shopName: '',
                          shopCategory: '',
                          shopDescription: '',
                          shopSlogan: '',
                          shopLocation: '',
                      } //shop followers, likes, etc, will have its own db with shop uuid to find it
            }
            validationSchema={userShopValidationSchema}
            onSubmit={async ({
                shopName,
                shopCategory,
                shopDescription,
                shopSlogan,
                shopLocation,
            }) => {
                const token = await getValueFor('jwtToken')
                const shopCreatorId = await getValueFor('currentUserId')
                const allData = new FormData()
                allData.append('shopName', shopName)
                allData.append('shopCategory', shopCategory)
                allData.append('shopDescription', shopDescription)
                allData.append('shopSlogan', shopSlogan)
                allData.append('shopLocation', shopLocation)
                allData.append(
                    'userShopProfilePictureFile',
                    selectedUserShopProfilePictureFile
                )
                allData.append(
                    'userShopProfileBannerFile',
                    selectedUserShopProfileBannerFile
                )
                allData.append('shopCreatorId', shopCreatorId)
                const response = await axios({
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                    method: userShop ? 'put' : 'post',
                    url: userShop
                        ? `http://192.168.0.9:3001/user-shop/${shopCreatorId}`
                        : `http://192.168.0.9:3001/user-shop`,
                    data: allData,
                })
                    .then(function (response) {
                        setResponseMessage(response.data.message)
                        setErrors(false)
                        setUserShopUpdated(true)
                        navigationHandler()
                    })
                    .catch(function (error) {
                        console.log(error)
                        setResponseMessage(error.response.data.error)
                        setErrors(true)
                    })

                Keyboard.dismiss()
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                values,
            }) => (
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                >
                    <View m={2} p={2}>
                        <View>
                            {responseMessage && errors ? (
                                <Text color="primary.500">
                                    📛{responseMessage}
                                </Text>
                            ) : responseMessage && !errors ? (
                                <Text color="primary.500">
                                    ✅{responseMessage}
                                </Text>
                            ) : null}
                        </View>
                        <InputField
                            label="Shop Name"
                            name="shopName"
                            value={values.shopName}
                            onChangeText={handleChange('shopName')}
                            onBlur={handleBlur('shopName')}
                        />

                        <InputField
                            label="Shop Category"
                            name="shopCategory"
                            value={values.shopCategory}
                            onChangeText={handleChange('shopCategory')}
                            onBlur={handleBlur('shopCategory')}
                            autoCorrect={false}
                        />
                        <InputField
                            label="Shop Description"
                            name="shopDescription"
                            value={values.shopDescription}
                            onChangeText={handleChange('shopDescription')}
                            onBlur={handleBlur('shopDescription')}
                        />
                        <InputField
                            label="Shop Slogan"
                            name="shopSlogan"
                            value={values.shopSlogan}
                            onChangeText={handleChange('shopSlogan')}
                            onBlur={handleBlur('shopSlogan')}
                        />
                        <InputField
                            label="Shop Location"
                            name="shopLocation"
                            value={values.shopLocation}
                            onChangeText={handleChange('shopLocation')}
                            onBlur={handleBlur('shopLocation')}
                        />

                        <C_Button
                            title={
                                selectedUserShopProfilePictureFile.uri
                                    ? 'Shop Profile Picture Selected'
                                    : 'Change Shop Profile Picture'
                            }
                            leftIcon={
                                selectedUserShopProfilePictureFile.uri ? (
                                    <Icon
                                        as={Feather}
                                        name="check"
                                        size={4}
                                        color="white"
                                    />
                                ) : (
                                    false
                                )
                            }
                            mt={2}
                            mb={1}
                            onPress={pickUserShopProfilePictureFile}
                        />
                        <C_Button
                            title={
                                selectedUserShopProfileBannerFile.uri
                                    ? 'Shop Banner Picture Selected'
                                    : 'Change Shop Banner Picture'
                            }
                            leftIcon={
                                selectedUserShopProfileBannerFile.uri ? (
                                    <Icon
                                        as={Feather}
                                        name="check"
                                        size={4}
                                        color="white"
                                    />
                                ) : (
                                    false
                                )
                            }
                            mb={1}
                            onPress={pickUserShopProfileBannerFile}
                        />
                        <C_Button
                            title="Save Changes"
                            loading={isSubmitting}
                            onPress={handleSubmit}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </Formik>
    )
}
