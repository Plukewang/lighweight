import { TodayProps } from "../../types/home/home";
import { Pressable, Text, View } from "react-native";
import { styles, darkstyles } from "../../theme/sessionstyle";
import { MyText } from "../../theme/ui/myText";
import { useCycleListStore, useCycleStore } from "../../src/trainingCycleTemplateStore";
import { ConvertWeekday, ConvertWeekdayTrunc } from "../../src/convertWeekday";
import { getTrainingCycle } from "../../src/asyncLayer";
import { useEffect, useState } from "react";
import { Exerciseprog, Trainingcycle, WorkOut, Workout, setInfo, updateSet } from "../../src/exercises";
import { UseAppStateStore } from "../../src/globalAppState";
import { PaginatedSwiper } from "../../theme/ui/paginatedSwiper";
import { Session } from "../../theme/ui/session";

export const Today = ({navigation, route}: TodayProps)=>{
    const cycles = useCycleListStore((state)=>state.cycles)
    const activeCycle = useCycleListStore((state)=>state.active)//get active cycle from list
 
    const [thisCycle, setThisCycle] = useState<Trainingcycle | null>(null)//completion of current cycle stuff

    const load = useCycleStore((state)=>state.loadCycle)

    const currCycle = useCycleStore((state)=>state.workoutScheme)


    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currTheme = theme=== 'Light'? styles : darkstyles

    const date = new Date()
    const weekday = date.getDay()

    const [currDay, setCurrDay] = useState<number>(weekday)
    const updateSessionSets = useCycleStore((state)=>state.updateSessionExercise)

   
    //console.log(schemeWithEmptyDays)
    const [weeks, setWeeks] = useState<Workout[]>([])

    useEffect(()=>{
        if(thisCycle) load(thisCycle);
        const schemeWithEmptyDays: (Workout | null)[] = Array(thisCycle?.weeks)

        let currday =0
        for(let i=0;i<7;i++){
    
            if (currCycle[currday]?.day === ConvertWeekdayTrunc(i+1)){
                
                schemeWithEmptyDays.push(currCycle[currday])
                currday++
            }else schemeWithEmptyDays.push(WorkOut([], ConvertWeekdayTrunc(i+1) as Workout['day']))
            
        }

        const weeks1 = Array(thisCycle?.weeks).fill(schemeWithEmptyDays).flat()

        setWeeks(weeks1)

       
    }, [currCycle, thisCycle])
 
    useEffect(()=>{
        async function getCycle(){
            if(cycles.length){
                try{
                    const result = await getTrainingCycle(cycles[activeCycle])
                    if(result) {
                        setThisCycle(result)

                    }else setThisCycle(null)
                }catch(error){
                    throw error
                }
                
            }else{
                setThisCycle(null)

            }
            
                //console.log(thisCycle?.workoutScheme[1])
                
        }
        getCycle()
    },[cycles, activeCycle])
    

    return (
       
        <View style={currTheme.container}>
        {!thisCycle ? <>
        <MyText
                size = {16}
                highlight = {theme==='Light'?false: 'white'}
                align = {"center"}  
            >
                No Sessions Found!
        </MyText>
        <MyText
                size = {16}
                highlight = {theme==='Light'?false: 'white'}
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
                highlight = {theme==='Light'?false: 'white'}
                align = {"center"}  
            >
                Make one here.
            </MyText>
        </Pressable>
        </> : 
    
        <PaginatedSwiper
            defaultItem={currDay}
        >
            {
                weeks?.map((workout, index)=>{
                    if(workout){
                        return <Session key = {index} weekday={ConvertWeekdayTrunc((index)%7+1) as Workout['day']} week={Math.floor((index+1)/7)} exercises={workout.exercises}/>
                    }else return <Session key = {index} weekday={ConvertWeekdayTrunc((index)%7+1) as Workout['day']} week={Math.floor((index+1)/7)} exercises={[]}/>
                })
            }

        </PaginatedSwiper>}

        
        </View>
    )
    /** 
    return (  
    <View style={currTheme.container}>
        {//when there is no workout data found for the current training cycle
        !thisCycle ? <>
        <MyText
                size = {16}
                highlight = {theme==='Light'?false: 'white'}
                align = {"center"}  
            >
                No Sessions Found!
        </MyText>
        <MyText
                size = {16}
                highlight = {theme==='Light'?false: 'white'}
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
                highlight = {theme==='Light'?false: 'white'}
                align = {"center"}  
            >
                Make one here.
            </MyText>
        </Pressable>
        </> : 
        <View
            style={currTheme.subcontainer}
        >
            <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10, alignItems: 'center'}}>

                <Pressable
                    onPress={
                        ()=>{//go to the next day
                            setCurrDay((prev)=>prev-1<1? 7 : prev-1)
                        }
                    }
                >
                    <MaterialCommunityIcons name="chevron-double-left" size={30} color={currTextColor} />
                </Pressable>

                <MyText
                    size = {20}
                    highlight = {theme==='Light'? false : 'white' }
                    align = {"center"}  
                >
                    {ConvertWeekday(currDay)+', '+mmddyyyy+": Week "+thisCycle?.currentWeek || 1}
                </MyText>

                <Pressable
                    onPress={
                        ()=>{//go to the next day
                            setCurrDay((prev)=>prev+1>7? 1 : prev+1)
                        }
                    }
                >
                    <MaterialCommunityIcons name="chevron-double-right" size={30} color={currTextColor} />
                </Pressable>
            </View>
            

            {
                !thisCycle?.workoutScheme?.find(w => w.day === weekdayShortHand ) ||  !thisCycle?.workoutScheme.find(w => w.day === weekdayShortHand )?.exercises.length ? 
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
                control = {finished === thisCycle?.workoutScheme?.find(w => w.day === weekdayShortHand )?.exercises?.length && thisCycle?.workoutScheme.find(w => w.day === weekdayShortHand )?.exercises?.length != 0} 
                close = {()=>{
                    //console.log(thisCycle?.workoutScheme[weekday-1]?.exercises?.length)
                    setFinished(0)
                    setCurrDay(prev=>(prev+1 )% 7)
                } }/>
        </View>
        
        }
        
    </View>)*/

}