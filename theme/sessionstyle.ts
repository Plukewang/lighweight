import { StyleSheet } from "react-native";

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
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    exerciseInfoCol2: {
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