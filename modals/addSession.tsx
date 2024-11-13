import { View, Modal, Pressable, Text, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { styles, darkstyles } from "../theme/cyclestyle";
import { addSessionprops } from "../types/ui";
import { AddExercise } from "./addExercise";
import { useCycleStore } from "../src/trainingCycleTemplateStore";
import { Workout } from "../src/exercises";
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EditExercise } from "../theme/ui/editExercise";
import { UseAppStateStore } from "../src/globalAppState";

export const AddSession = ({weekday}:addSessionprops): JSX.Element =>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const currTheme = theme=== 'Light'? styles : darkstyles

    const [open, setOpen] = useState<boolean>(false);
    
    const [session, setSession] = useState<Workout>()//loading from global training cycle store the current training day's session if one exists.

    const workouts = useCycleStore((state)=>state.workoutScheme) //get the state store of the 7 workout days.
    const setAddworkouts = useCycleStore((state)=>state.addCycleSession)
    const deleteCurrentWorkout = useCycleStore((state)=>state.removeCycleSession)

    const currentDaySession = workouts[workouts.findIndex((workout)=>workout.day == weekday)];

    return (
        <View>
            <Modal
                visible ={open}
                transparent={true}  
                animationType="slide"
            >
                {/* We use pressable here so that we can immediately exit out of a keyboard when we are done inside the modal's inputs. */}
                <Pressable
                    onPress={Keyboard.dismiss}
                    style={currTheme.modal}
                >
                    <Text>{weekday}</Text>

                    <KeyboardAwareScrollView
                        style={{
                            width: '100%'
                        }}
                    >
                        <AddExercise weekday = {weekday}/>
                        
                        {//these are all the exercises for the session
                            currentDaySession?.exercises?.map((exercise,i)=>{
                                //console.log(exercise.exercise.name)
                                return <View 
                                    key = {i}
                                >
                                    <EditExercise editedExercise={exercise} day={weekday} id={i}/>
                                </View>
                            })
                        }
                    
                    </KeyboardAwareScrollView>
 
                    
                </Pressable>
                    <Pressable
                        onPress={()=>setOpen(false)}
                        style={{
                            position: 'absolute',
                            bottom: '20%',
                            right: '35%',
                            width: '30%',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Ionicons name="exit-outline" size={24} color={currTextColor} />
                    </Pressable>

            </Modal>

            {/*
                Above is the modal for adding a workout session.
                Below is the button used to open the modal to add a workout session.
            */}
            <Pressable 
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={
                    ()=>{
                        setOpen(true)//opens the modal by setting the visible variable 'open' to true.
                        const retrieveWorkoutIndex = workouts.findIndex((workout)=>workout.day == weekday) //check if there's an already existing workout for that day.
                        if(retrieveWorkoutIndex != -1){
                        }else{
                            setAddworkouts(weekday) //call global store add workout function to add an empty workout to the current day pressed.
                        }
                    }
                }
            >
                <Text style={{color: currTextColor}}>
                    {weekday}
                </Text>
                
                {
                !currentDaySession ? 
                    <>
                        <Text style={styles.promptAdd}>Add a session</Text>
                        <Ionicons name="add" size={20} color={currTextColor} />
                    </>
                    : 
                    <>
                        <Text style={styles.promptAdd}>Edit session</Text>

                        <Feather name="edit" size={20} color={currTextColor} /> 

                        <Pressable
                            onPress={()=>{
                                deleteCurrentWorkout(weekday);
                            }}
                            style={{
                                marginLeft: 20,
                            }}
                        >
                            <Feather name="trash" size={20} color={currTextColor} /> 
                        </Pressable>
                    </>
                
                }
                    
                    
                </Pressable>

            
        </View>
        
    )
}