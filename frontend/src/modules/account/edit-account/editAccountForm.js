import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Keyboard } from 'react-native'
import { Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { View, Text } from 'native-base'
import * as ImagePicker from 'expo-image-picker'

// Customs
import { getValueFor } from '../../../shared/UserAuthentication'
import { InputField } from '../../../components/form-fields/InputField'
import C_Button from '../../../components/ui-components/Button'
import { getFileInfo } from '../../../shared/FileInformation'

const EditAccountForm = ({ userProfile, setUserUpdated, navigation }) => {
    const [responseMessage, setResponseMessage] = useState(null)
    const [errors, setErrors] = useState(null)
    const existingUserProfileValues = {
        username: userProfile.username,
        displayName: userProfile.displayName,
        bio: userProfile.bio,
    }
    const [selectedProfilePictureFile, setSelectedProfilePictureFile] =
        useState({
            profilePictureFile: undefined,
            profilePicturePreviewURI: undefined,
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

    const pickProfilePictureFile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            const profilePictureFileInfo = await getFileInfo(result.uri)
            // required EXACT
            var fileToUpload = {
                name: profilePictureFileInfo.uri,
                size: profilePictureFileInfo.size,
                uri: profilePictureFileInfo.uri,
                type: 'application/' + result.type,
            }
            setSelectedProfilePictureFile(fileToUpload)
        }
    }

    const userProfileValidationSchema = Yup.object({
        username: Yup.string()
            .trim()
            .lowercase()
            .matches(/^[ A-Za-zñáéíóúü0-9_.-]*$/, 'You may only use _ . - ')
            .matches(/^(?![0-9_.-]+$)/, 'Letters are required') // if matches regex
            .matches(/^\S*$/, 'No spaces allowed')
            .min(6, 'Username must be longer than 6 characters')
            .max(32, 'Username is too long')
            .required('Username cannot be left blank'),
        displayName: Yup.string().max(32, 'Display name is too long.'),
        bio: Yup.string().max(64, 'Bio is too long'),
    })

    const navigationHandler = () => {
        navigation.navigate('Profile')
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={
                userProfile
                    ? existingUserProfileValues
                    : { username: '', displayName: '', bio: '' }
            }
            validationSchema={userProfileValidationSchema}
            onSubmit={async ({ username, displayName, bio }) => {
                const token = await getValueFor('jwtToken')
                const currentUserId = await getValueFor('currentUserId')
                const allData = new FormData()
                allData.append('profilePictureFile', selectedProfilePictureFile)
                allData.append('username', username)
                allData.append('displayName', displayName)
                allData.append('bio', bio)
                console.log(allData)
                const response = await axios({
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        authorization: `Bearer ${token}`,
                    },
                    method: 'put',
                    url: `http://192.168.0.9:3001/user/${currentUserId}`,
                    data: allData,
                })
                    .then(function (response) {
                        setResponseMessage(response.data.message)
                        setErrors(false)
                        setUserUpdated(true)
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
                <View m={2} p={2}>
                    <View>
                        {responseMessage && errors ? (
                            <Text color="primary.500">📛{responseMessage}</Text>
                        ) : responseMessage && !errors ? (
                            <Text color="primary.500">✅{responseMessage}</Text>
                        ) : null}
                    </View>
                    <InputField
                        label="Display Name"
                        name="displayName"
                        value={values.displayName}
                        onChangeText={handleChange('displayName')}
                        onBlur={handleBlur('displayName')}
                    />

                    <InputField
                        label="Username"
                        name="username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        autoCorrect={false}
                    />
                    <InputField
                        label="Bio"
                        name="bio"
                        value={values.bio}
                        onChangeText={handleChange('bio')}
                        onBlur={handleBlur('bio')}
                    />

                    <C_Button
                        title={
                            selectedProfilePictureFile.uri
                                ? 'Profile Picture Selected'
                                : 'Change Profile Picture'
                        }
                        leftIcon={
                            selectedProfilePictureFile.uri ? (
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
                        onPress={pickProfilePictureFile}
                    />
                    <C_Button
                        title="Save Changes"
                        loading={isSubmitting}
                        onPress={handleSubmit}
                    />
                </View>
            )}
        </Formik>
    )
}

export default EditAccountForm
