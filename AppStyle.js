import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        fontSize: 25,
        textAlign: 'center',
        padding: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    defaultButton: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#48BB78',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    defaultButtonContainer: {
        alignSelf: 'center',
        justifyContent: 'center'
    }
});