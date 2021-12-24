import * as SecureStore from 'expo-secure-store'

export const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value)
}

export const getValueFor = async (key) => {
    let result = await SecureStore.getItemAsync(key)
    if (result) {
        return result
    }
    return false
}

export const checkAuthentication = () => {
    const jwtAuthCheck = SecureStore.getItemAsync('jwtToken')
    if (jwtAuthCheck) {
        return true
    }
}
