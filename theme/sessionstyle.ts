import { StyleSheet } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    subcontainer:{
        width: '90%',
        height: '90%',
        alignSelf: 'center'
    },
    exerciseBlock: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#F3F3F3',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: 10,
    },
    exerciseInfo: {
      flexDirection: 'row',
      width: '100%',
      padding: 5,
      margin: 5,
    },
    exerciseInfoCol1: {
      height: 20,
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    exerciseInfoCol2: {
      height: 20,
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    exerciseBlockSet: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    exerciseInput: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#F3F3F3',
      height: 24,
      width: 40,
      margin: 5,
    }
  });
  export const darkstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
      },
    subcontainer:{
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        backgroundColor: '#121212'
    },
    exerciseBlock: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#181818',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: 10,

    },
    exerciseInfo: {
      flexDirection: 'row',
      width: '100%',
      padding: 5,
      margin: 5,
      
    },
    exerciseInfoCol1: {
      height: 20,
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    exerciseInfoCol2: {
      height: 20,
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    exerciseBlockSet: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    exerciseInput: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#181818',
      height: 24,
      width: 40,
      margin: 5,
    }
  });