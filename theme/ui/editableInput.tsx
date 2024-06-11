import { TextInput, View, Pressable } from "react-native";
import { styles } from "../cyclestyle";
import { editableProps } from "../../types/text";
import { useRef } from "react";
import Feather from '@expo/vector-icons/Feather';


export const EditableInput = ({ variable, onChangeText, defaultItem, inputMode, } :editableProps) =>{

    const textRef = useRef<TextInput>(null)//get ref to textinput to focus on it

    return (
        <Pressable 
            style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', gap: 10}}
            onPress={textRef.current?.focus}    
        >
                        <TextInput
                            placeholder={defaultItem}    
                            keyboardType={inputMode}
                            onChangeText={onChangeText}//passed onchangetext function to set a variable
                            value = {variable}//controlled input
                            placeholderTextColor='black'
                            ref={textRef}//this is to get the input to focus using the pressable
                        />
                        <Pressable 
                            onPress={()=>textRef.current && textRef.current.focus()}>
                            <Feather name="edit" size={20} color="grey" />
                        </Pressable>
                        
        </Pressable>     
    )
}