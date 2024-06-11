import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface selectprops{
    data: Array<any>
    defaultItem: any
    onSelect: (selectedItem: any)=>void
}

export const WeightSelect = ({data, defaultItem, onSelect}: selectprops): JSX.Element =>{

    return(
        <SelectDropdown
    data={data}
    onSelect={(selectedItem, index) => {
        onSelect(selectedItem);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem) ? selectedItem : ""+defaultItem}
          </Text>
          <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'black'} size={24} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: 85,
      height: 30,
      backgroundColor: '#F3F3F3',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 16,
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#F3F3F3',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });