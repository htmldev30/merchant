// Code adapted from Expo FileSystem Documentation
// https://docs.expo.dev/versions/latest/sdk/filesystem/
import * as FileSystem from 'expo-file-system'

export const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}
