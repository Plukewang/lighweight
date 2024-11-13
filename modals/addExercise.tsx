import { View, Modal, Pressable, Text, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../src/firebase.config";
import {  QuerySnapshot, collection,  doc,  getDocs } from "firebase/firestore"; 
import { Loading } from "../screens/loading";
import { SearchBar } from "../theme/ui/searchBar";

import { useCycleStore } from "../src/trainingCycleTemplateStore";
import { Exercise, addSessionprops } from "../types/ui";
import { Exerciseprog, Build } from "../src/exercises";
import { UseAppStateStore } from "../src/globalAppState";

export  const AddExercise = ({weekday}: addSessionprops): JSX.Element =>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [exercises, setExercises] = useState<Array<any>>([]);

    const exerciseProgs = useCycleStore((state)=>state.workoutScheme.find((workout)=>workout.day==weekday)?.exercises);//find the exercises of the workout scheme for the matching day.
    const addExerciseProg = useCycleStore((state)=>state.addSessionExercise)

    const checkExercise = (exercise: Exercise) =>{
        if(exerciseProgs){
            for(const prog of exerciseProgs){
                return prog.exercise.name === exercise.name
            }
        }
    }

    const exerciseSearchBarAction = (exercise: Exercise):void =>{
        //this selects an exercise and adds it to the workout on that day.
        let addedProg = Build(exercise)
        addExerciseProg(addedProg, weekday);
        setOpen(false)
    }

    useEffect(()=>{
        async function fetchQuery(){
            try{
                const querySnapshot = await getDocs(collection(db, "exercises"));//fetch the exercises in the database
                let result: Array<any> = [];
                querySnapshot.forEach((docs)=>{
                    result.push({name: docs.id, data: docs.data()})
                })
                setExercises(result);
                setLoading(false);
            }catch(error){
                console.error(error)
            }
        }
       fetchQuery();

    },[]);

    return(
        <View>
            <Pressable
                style={{              
                    opacity: open? 0:1,
                    width: '90%',
                    height: 40,
                    padding: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#F3F3F3',
                    margin: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: "flex-start",
                    backgroundColor: currBackgroundColor,
                }}
                onPress={//opens the modal by setting the visible variable 'open' to true.
                    ()=>setOpen(true)
                }
            >
                <Text style={{textAlign: 'center', color: currTextColor}}>Add an Exercise...</Text>
            </Pressable>

            <Modal
                visible={open}
                transparent
            >
                <Pressable
                    style={{
                        height: '80%',
                        width: '90%',
                        opacity: 1,
                        position: 'absolute',
                        bottom: '10%',
                        left: '5%',
                        borderRadius: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: 24,
                    }}
                    onPress={()=>{
                        setOpen(false)
                    }}
                >
                    <Text>{weekday}</Text>
                    <Pressable
                    style={{
                        width: '90%',
                        height: '50%',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        backgroundColor: 'white'
                    }}
                        onPress={()=>{
                            Keyboard.dismiss();
                        }}
                    >
                        {
                            loading ? <Loading /> : 
                            (<SearchBar list={exercises} action={exerciseSearchBarAction}/>)
                        }  
                    </Pressable>
                </Pressable>

            </Modal>
        </View>
    )
}

/**
 * <Pressable
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
                            <Ionicons name="exit-outline" size={24} color="gray" />
                    </Pressable>
 */