import { TodayProps } from "../../types/home/home";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../theme/sessionstyle";
import { MyText } from "../../theme/ui/myText";
import { useCycleListStore, useCycleStore } from "../../src/trainingCycleTemplateStore";
import { ConvertWeekday, ConvertWeekdayTrunc } from "../../src/convertWeekday";
import { getTrainingCycle } from "../../src/asyncLayer";
import { useEffect, useState } from "react";
import { Exerciseprog, Trainingcycle, Workout, setInfo, updateSet } from "../../src/exercises";
import { ScrollView } from "react-native-gesture-handler";
import { ExerciseBlock } from "../../theme/ui/exerciseBlock";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FinishWorkout } from "../../modals/workoutFinishCongratulation";

export const Today = ({navigation, route}: TodayProps)=>{
    const cycles = useCycleListStore((state)=>state.cycles)
    const activeCycle = useCycleListStore((state)=>state.active)//get active cycle from list

    const [thisCycle, setThisCycle] = useState<Trainingcycle | null>(null)
    const [finished, setFinished] = useState<number>(0)

    const date = new Date()
    const weekday = date.getDay()
    const mmddyyyy = date.toISOString().split('T')[0];
    const weekdayShortHand = ConvertWeekdayTrunc(weekday) as Workout['day']


    const updateSessionSets = useCycleStore((state)=>state.updateSessionExercise)


    useEffect(()=>{
        async function getCycle(){
            if(cycles.length){
                try{
                    const result = await getTrainingCycle(cycles[activeCycle])
                    if(result) {
                        setThisCycle(result)
                        setFinished(0)
                    }else setThisCycle(null)
                }catch(error){
                    throw error
                }
                
            }else{
                setThisCycle(null)
                setFinished(0)
            }
            
                //console.log(thisCycle?.workoutScheme[1])
                
        }
        getCycle()
    },[cycles, activeCycle])

    let workouts = thisCycle?.workoutScheme.find((workout: Workout)=>workout.day===ConvertWeekdayTrunc(weekday));

    
    //dummy 
    return (
    <View style={styles.container}>
        {//when there is no workout data found for the current training cycle
        !thisCycle ? <>
        <MyText
                size = {16}
                highlight = {false}
                align = {"center"}  
            >
                No Sessions Found!
        </MyText>
        <MyText
                size = {16}
                highlight = {false}
                align = {"center"}  
            >
                Don't have a training cycle yet? 
        </MyText>

        <Pressable
            onPress={()=>{
                navigation.navigate('Cycle');
            }}    
        >
            <MyText
                size = {16}
                highlight = {false}
                align = {"center"}  
            >
                Make one here.
            </MyText>
        </Pressable>
        </> : 
        <View
            style={styles.subcontainer}
        >
            <MyText
                size = {20}
                highlight = {false}
                align = {"center"}  
            >
                {ConvertWeekday(weekday)+', '+mmddyyyy+": Week "+thisCycle?.currentWeek || 1}
            </MyText>

            {
                !thisCycle?.workoutScheme.find(w => w.day === weekdayShortHand ) ||  !thisCycle?.workoutScheme.find(w => w.day === weekdayShortHand )?.exercises.length ? 
                <View style={{height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="calendar-heart" size={50} color="black" style={{margin: 20}}/>
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
                {//TODO: make the finished thing only pop up for when you are done and not when cancelling
                    thisCycle?.workoutScheme.find(w => w.day === weekdayShortHand )?.exercises?.length ? workouts?.exercises?.map((exercise: Exerciseprog, i)=>{
                        return (
                        <ExerciseBlock 
                            key = {i} 
                            exercise={exercise} 
                            updateSet={(sets: setInfo[])=>{
                                let updatedSets: Exerciseprog = exercise;
                                for(let j = 0; j<sets.length;j++){
                                    if(sets[j]){
                                        updatedSets = updateSet(exercise, exercise.currentWeek,sets[j],j)
                                    }
                                }
                                updateSessionSets(updatedSets, weekdayShortHand, i)
                                setFinished(finished+1)
                            }}
                        />)
                    }): <></>
                }
            </ScrollView>
            }

            <FinishWorkout 
                control = {finished === thisCycle?.workoutScheme.find(w => w.day === weekdayShortHand )?.exercises?.length && thisCycle?.workoutScheme.find(w => w.day === weekdayShortHand )?.exercises?.length != 0} 
                close = {()=>{
                    //console.log(thisCycle?.workoutScheme[weekday-1]?.exercises?.length)
                    setFinished(0)
                } }/>
        </View>
        
        }
        
    </View>)
}