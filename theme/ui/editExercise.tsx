import { useState, useRef } from "react";

import { Pressable, Text, View } from "react-native";
import { editExerciseProps } from "../../types/ui";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AdjustExercise } from "../../modals/adjustExercise";
import { UseAppStateStore } from "../../src/globalAppState";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MyText } from "./myText";

export const EditExercise = ({editedExercise, day, id}: editExerciseProps):JSX.Element=>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'

    return <ScrollView
        contentContainerStyle={{
            width: '90%',
            height: 100,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: currBackgroundColor,
            backgroundColor: currBackgroundColor,
            padding: 10,
            margin: 5,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: "flex-start",
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            overflow: 'scroll'
        }}
    >       
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                <View >
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: currTextColor
                    }}
                >
                    {editedExercise.exercise.name}
                </Text>
                <MyText 
                    highlight={true}
                    size={12}
                    align="left"
                >
                    {editedExercise.exercise.data.primary[0]}
                </MyText>
                </View>
                

                <AdjustExercise editedExercise={editedExercise} day={day} id={id}/>
            </View>
        
            <MaterialCommunityIcons name="weight" size={24} color={currTextColor} />
            <Text style={{color: currTextColor}}>{editedExercise.startingWeight}</Text>
            <MaterialCommunityIcons name="weight-lifter" size={24} color={currTextColor} />
            <Text style={{color: currTextColor}}>{editedExercise.startingReps}</Text>
            <MaterialCommunityIcons name="repeat-variant" size={24} color={currTextColor} />
            <Text style={{color: currTextColor}}>{editedExercise.sets}</Text>
        
       
    </ScrollView>
}