import { StyleSheet } from 'react-native';
import Colors from './constants/Colors';

const defaultButton = {
    fontSize: 20,
    color: 'white',
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.green500,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
}

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
       ...defaultButton
    },
    defaultButtonContainer: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    outlinedButton: {
        ...defaultButton,
        backgroundColor: '#fff',
        color: Colors.green500,
        borderWidth: 1,
        borderColor: Colors.green500
    }
});