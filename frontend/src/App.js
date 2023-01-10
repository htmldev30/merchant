//Code Adapted from NativeBase Documentation example
//https://docs.nativebase.io/customizing-theme
import React from 'react'
import AuthenticationProvider from './hooks/context/AuthenticationProvider'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { registerRootComponent } from 'expo' // import it explicitly
import Index from './index'
function App() {
    const theme = extendTheme({
        colors: {
            // Add new color
            primary: {
                100: '#525252',
                200: '#3d3d3d',
                300: '#3f3f3f',
                400: '#141414',
                500: '#000000',
                600: '#000000',
                700: '#000000',
                800: '#000000',
                900: '#000000',
                // button hover color
            },
            text: {
                500: '#000',
            },
            background: {
                500: '#fff',
            },
            secondary: {
                500: '#3f3f3f',
            },
            muted: {
                500: '#e0e0e0',
            },
            highlight: {
                500: '#9f9f9f',
            },
            gray: {
                500: '#6c6c6c',
            },
            accent: {
                500: '#3f3f3f',
            },
        },
        // config: {
        //     // Changing initialColorMode to 'dark'
        //     initialColorMode: 'dark',
        // },
    })
    return (
        <NativeBaseProvider theme={theme}>
            <AuthenticationProvider>
                <Index />
            </AuthenticationProvider>
        </NativeBaseProvider>
    )
}

export default registerRootComponent(App)
