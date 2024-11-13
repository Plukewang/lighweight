import { TextInput, View, Pressable } from "react-native";

import { editableProps } from "../../types/text";
import { useRef } from "react";
import Feather from '@expo/vector-icons/Feather';
import { UseAppStateStore } from "../../src/globalAppState";

export const EditableInput = ({ variable, onChangeText, defaultItem, inputMode, } :editableProps) =>{

    const textRef = useRef<TextInput>(null)//get ref to textinput to focus on it
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#404040'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    
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
                            placeholderTextColor={currTextColor}
                            ref={textRef}//this is to get the input to focus using the pressable
                            style={{color: currTextColor}}
                        />
                        <Pressable 
                            onPress={()=>textRef.current && textRef.current.focus()}>
                            <Feather name="edit" size={20} color={currTextColor} />
                        </Pressable>
                        
        </Pressable>     
    )
}