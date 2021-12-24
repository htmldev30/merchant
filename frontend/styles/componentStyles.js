import { globalStyles } from './global'
export const globalButtonStyles = {
    buttonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        margin: 5,
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        alignSelf: 'center',
        ...globalStyles.interRegular,
    },
}
