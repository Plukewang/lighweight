import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    tab:{
        width: '100%',
        flexDirection: 'column'
    },
    settingsTabs:{
        width: '95%',
        flexDirection: 'column',
        margin: 5,
        borderRadius: 16,
    },
    account: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profile: {
        width: '95%',
        height: '30%',
        margin: 5,
        padding: 15,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        padding: 15,
        width: '100%',
        borderBottomColor: 'whitesmoke',
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    modal: {
        height: '50%',
        width: '80%',
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: '25%',
        left: '10%',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButton: {
        margin: 5,
        padding: 15,
        width: '80%',
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F3F3F3'
    },
    inputs:{
        margin: 5,
        padding: 10,
        borderRadius: 8,
        width: '80%',
        backgroundColor: '#F3F3F3',
    },
})