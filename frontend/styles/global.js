import { StyleSheet } from 'react-native'
export const fonts = {
    'Inter-ExtraLight': require('../assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf'),
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    view_container: {
        flex: 1,
        backgroundColor: 'white',
    },
    interExtraLight: {
        fontFamily: 'Inter-ExtraLight',
    },
    interLight: {
        fontFamily: 'Inter-Light',
    },
    interRegular: {
        fontFamily: 'Inter-Regular',
    },
    interMedium: {
        fontFamily: 'Inter-Medium',
    },
    interSemiBold: {
        fontFamily: 'Inter-SemiBold',
    },
    interBold: {
        fontFamily: 'Inter-Bold',
    },
    interExtraBold: {
        fontFamily: 'Inter-ExtraBold',
    },
})
