import { useState, useRef } from "react";

import { Pressable, Text, View } from "react-native";
import { editExerciseProps } from "../../types/ui";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AdjustExercise } from "../../modals/adjustExercise";

import { MaterialCommunityIcons } from '@expo/vector-icons';

export const EditExercise = ({editedExercise, day, id}: editExerciseProps):JSX.Element=>{
    return <ScrollView
        contentContainerStyle={{
            width: '90%',
            height: 90,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#F3F3F3',
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
                <Text
                    style={{
                        fontWeight: 'bold',
                    }}
                >
                    {editedExercise.exercise.name}
                </Text>

                <AdjustExercise editedExercise={editedExercise} day={day} id={id}/>
            </View>
        
            <MaterialCommunityIcons name="weight" size={24} color="black" />
            <Text>{editedExercise.startingWeight}</Text>
            <MaterialCommunityIcons name="weight-lifter" size={24} color="black" />
            <Text>{editedExercise.startingReps}</Text>
            <MaterialCommunityIcons name="repeat-variant" size={24} color="black" />
            <Text>{editedExercise.sets}</Text>
        
       
    </ScrollView>
}