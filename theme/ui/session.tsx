
import { Pressable, Text, View } from "react-native";
import { styles, darkstyles } from "../../theme/sessionstyle";
import { MyText } from "../../theme/ui/myText";
import { useCycleStore } from "../../src/trainingCycleTemplateStore";

import { useEffect, useMemo, useState } from "react";
import { Exerciseprog, ExerciseProg, Trainingcycle, Workout, progressExercise, setInfo, updateExerciseTargets, updateSet } from "../../src/exercises";
import { ScrollView } from "react-native-gesture-handler";
import { ExerciseBlock } from "../../theme/ui/exerciseBlock";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FinishCycle, FinishWorkout } from "../../modals/workoutFinishCongratulation";
import { UseAppStateStore } from "../../src/globalAppState";

interface Props{
    weekday: Workout['day']
    week: number
    exercises: Exerciseprog[]
}

export const Session = ({weekday, week, exercises}: Props): JSX.Element =>{
    const progress = useCycleStore((state)=>state.progress)
    const totalweeks = useCycleStore((state)=>state.weeks)
    const totalSessions = useCycleStore((state)=>state.workoutScheme?.length)
    const reset = useCycleStore((state)=>state.resetProgress)

    const finishedcycle: boolean = useMemo(()=>{
        return progress>=totalSessions*totalweeks && progress > 0
    },[progress, totalSessions, totalweeks])

    const [finished, setFinished] = useState<number>(0)//number of finished exercises
    const [sessionComplete, setSessionComplete] = useState<boolean>(false)

    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currTheme = theme=== 'Light'? styles : darkstyles

    const weekdayShortHand = weekday

    const finishExercise = ()=>{
        setFinished(finished+1)
        if(finished+1 === exercises.length){
            setSessionComplete(true)
        }
    }


    const updateSessionSets = useCycleStore((state)=>state.updateSessionExercise)
    const updateExercise = useCycleStore((state)=>state.updateSessionExercise)
    const updateProgress = useCycleStore((state)=>state.updateProgress)

    return (<View style={currTheme.container}>
        <View
            style={currTheme.subcontainer}
        >
            <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10, alignItems: 'center'}}>

                <MyText
                    size = {20}
                    highlight = {theme==='Light'? false : 'white' }
                    align = {"center"}  
                >
                    {weekday+ ": Week "+(week+1)}
                </MyText>

            </View>
            

            {
                !exercises?.length ? 
                <View style={{height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="calendar-heart" size={50} color={theme==='Light'?'black': 'white'} style={{margin: 20}}/>
                    <MyText
                        size = {16}
                        highlight = {true}
                        align = {"center"}  
                    >
                        Take this day to rest,
                    </MyText>
                    <MyText
                        size = {16}
                        highlight = {false}
                        align = {"center"}  
                    >
                        You've earned it!
                    </MyText>
                </View> 
                :
                <ScrollView>
                {
                    exercises?.map((exercise: Exerciseprog, i)=>{
                        return (
                        <ExerciseBlock 
                            key = {i} 
                            week = {week}
                            id = {i}
                            day = {weekdayShortHand}
                            exercise={exercise} 
                            updateSet={(sets: setInfo[])=>{
                                let updatedSets: Exerciseprog = exercise;
                                for(let j = 0; j<sets.length;j++){
                                    if(sets[j]){
                                        updatedSets = updateSet(exercise, exercise.currentWeek,sets[j],j)
                                    }
                                }
                                updateSessionSets(updatedSets, weekdayShortHand, i)
                                finishExercise()
                            }}
                            updateTargets={(weight: number, reps: number)=>{
                                const updated = progressExercise(exercise, weight, reps)
                                updateExercise(updated, weekdayShortHand, i)
                                
                            }}
                        />)
                    })
                }
            </ScrollView>
            }
            {
                finishedcycle? 
                <FinishCycle
                    control={finishedcycle}
                    close={()=>{
                        reset()
                    }}
                />:
                <FinishWorkout 
                    control = {sessionComplete} 
                    close = {()=>{
                        updateProgress()
                        setSessionComplete(false)
                    }}
                />
            }
            


        </View>
    
        
    </View>)
}