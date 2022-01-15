import React, { useState } from 'react'
import C_Button from '../../components/ui-components/Button'
import { Heading, KeyboardAvoidingView, View, Stack, VStack } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { Icon } from 'native-base'
// Customs
import { authNativeBaseFormStyles } from '../../../styles/authStyles'
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from '../../firebase'
import { C_Input } from '../../components/ui-components/Input'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
            })
            .catch((error) => alert(error.message))
    }
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
            })
            .catch((error) => alert(error.message))
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                {...authNativeBaseFormStyles.container}
                behavior="padding"
            >
                <View>
                    <Heading {...authNativeBaseFormStyles.heading}>
                        Sign In
                    </Heading>
                </View>
                <View {...authNativeBaseFormStyles.inputContainer}>
                    <Stack space={4}>
                        <VStack>
                            <C_Input
                                inputPlaceholder="Email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </VStack>
                        <VStack>
                            <C_Input
                                inputPlaceholder="Password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />
                        </VStack>
                    </Stack>
                </View>
                <View {...authNativeBaseFormStyles.buttonContainer}>
                    <Stack space={2}>
                        <VStack>
                            <C_Button
                                title="Sign Up"
                                color="primary"
                                size="lg"
                                leftIcon={
                                    <Icon
                                        as={Feather}
                                        name="corner-right-up"
                                        size={4}
                                    />
                                }
                                onPress={handleSignUp}
                            />
                        </VStack>
                        <VStack>
                            <C_Button
                                title="Login"
                                variant="outline"
                                color="light"
                                size="lg"
                                leftIcon={
                                    <Icon as={Feather} name="log-in" size={4} />
                                }
                                onPress={handleLogin}
                            />
                        </VStack>
                    </Stack>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
