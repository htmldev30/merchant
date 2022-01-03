import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Formik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { View, Text, ScrollView } from 'native-base'
import { getValueFor } from '../../../shared/UserAuthentication'
import { InputField } from '../../../components/form-fields/InputField'
import C_Button from '../../../components/ui-components/Button'
export default SellerRequestForm = ({ navigation }) => {
    const [responseMessage, setResponseMessage] = useState(null)
    const [errors, setErrors] = useState(null)

    const sellerRequestValidationSchema = Yup.object({
        shopName: Yup.string()
            .matches(/^[ A-Za-zñáéíóúü0-9_.-]*$/, 'You may only use _ . - ')
            .matches(/^(?![0-9_.-]+$)/, 'Letters are required') // if matches regex
            .min(2, 'Shop name must be longer')
            .max(32, 'Shop name is too long')
            .required('Shop name cannot be left blank'),
        shopCategory: Yup.string().max(32, 'Shop Category too long.'),
        shopDetails: Yup.string().max(256, 'Shop Details is too long'),
        shopReferences: Yup.string().max(256, 'Shop references is too long'),
    })
    const navigationHandler = () => {
        navigation.navigate('Profile')
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                shopName: '',
                shopCategory: '',
                shopDetails: '',
                shopReferences: '',
            }}
            validationSchema={sellerRequestValidationSchema}
            onSubmit={async ({
                shopName,
                shopCategory,
                shopDetails,
                shopReferences,
            }) => {
                const token = await getValueFor('jwtToken')
                const currentUserId = await getValueFor('currentUserId')

                const response = await axios({
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                    method: 'post',
                    url: `http://192.168.0.9:3001/user/seller-request`,
                    data: {
                        shopName: shopName,
                        shopCategory: shopCategory,
                        shopDetails: shopDetails,
                        shopReferences: shopReferences,
                        userProfileId: currentUserId,
                        isApproved: false,
                    },
                })
                    .then(function (response) {
                        setResponseMessage(response.data.message)
                        setErrors(false)
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
                <ScrollView>
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
                                label="Shop Details"
                                name="shopDetails"
                                multiline={true}
                                numberOfLines={4}
                                value={values.shopDetails}
                                onChangeText={handleChange('shopDetails')}
                                onBlur={handleBlur('shopDetails')}
                            />
                            <InputField
                                label="Shop References"
                                name="shopReferences"
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Instagram, TikTok, etc"
                                value={values.shopReferences}
                                onChangeText={handleChange('shopReferences')}
                                onBlur={handleBlur('shopReferences')}
                            />

                            <C_Button
                                title="Request To Be Merchant"
                                loading={isSubmitting}
                                onPress={handleSubmit}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            )}
        </Formik>
    )
}
