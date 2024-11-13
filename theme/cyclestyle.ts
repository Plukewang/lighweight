import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exercises:{

    },
    createButton: {
        margin: 50,
        flexDirection: 'column',
        alignItems: 'center',

    },
    modal: {
        height: '80%',
        width: '80%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        borderRadius: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 24,
    },
    smallModal: {
        height: '40%',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 24,
    },
    inputs:{
        margin: 5,
        padding: 10,
        borderRadius: 8,
        width: '80%',
        backgroundColor: '#fff',
    },
    date: {
        flexDirection:'row',
        flexWrap: 'wrap',
        gap: 10,
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promptAdd: {
        fontSize: 16,
        padding: 16,
        color: 'gray'
    }
})

export const darkstyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exercises:{

    },
    createButton: {
        margin: 50,
        flexDirection: 'column',
        alignItems: 'center',

    },
    modal: {
        height: '80%',
        width: '80%',
        backgroundColor: '#121212',
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        borderRadius: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 24,
    },
    smallModal: {
        height: '40%',
        width: '80%',
        backgroundColor: '#121212',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 24,
    },
    inputs:{
        margin: 5,
        padding: 10,
        borderRadius: 8,
        width: '80%',
        backgroundColor: '#121212',
    },
    date: {
        flexDirection:'row',
        flexWrap: 'wrap',
        gap: 10,
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promptAdd: {
        fontSize: 16,
        padding: 16,
        color: 'gray'
    }
})