import { useState } from "react";
import { cycleStatsProps } from "../../types/ui"
import { AnalyzeWorkout, Workout, createVolumes, Volumes } from "../../src/exercises"
import { View, Pressable, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
import { UseAppStateStore } from "../../src/globalAppState";

export const CycleStats = ({cycle}: cycleStatsProps): JSX.Element =>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const currBorderColor = theme === 'Light'? 'black' : '#404040'

    const workoutScheme = cycle
    const weeklyVolumes = workoutScheme?.map((workout: Workout, i: number)=>{//get an array of volumes for each day of the week to receeive a workout volume object.
        return AnalyzeWorkout(workout);
    })

    //next, combine all seven days to yield a totaly weekly volume for each muscle by adding object entry-wise the volumes.

    const accumulator = (a: Volumes, b: Volumes): Volumes=>{
        let aKeys = Object.entries(a);
        let bKeys = Object.entries(b);
        for(let i in bKeys){
            aKeys[i][1]+=bKeys[i][1]
        }
        return Object.fromEntries(aKeys) as Volumes
    }

    const totals = weeklyVolumes?.reduce(accumulator, createVolumes())//use the above function to reduce to a single Volumes object.

    
    return(
    <View
        style={{
            width: 350,
            height: 300,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            margin: 10,
        }}
    >
        
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: '100%',
                height: '100%',
                backgroundColor: currBackgroundColor,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: currBorderColor,

            }}
        >
            <Text style={ { margin: 10, textAlign: 'center', fontSize: 16,color: currTextColor}}>Sets per muscle</Text>
            <View
                style={{margin: 10,flexDirection: 'row', justifyContent: 'space-between'}}
            >
                <Text style={{fontWeight: 'bold', color: currTextColor}}>Muscle</Text>
                <Text style={{fontWeight: 'bold', color: currTextColor}}>Sets</Text>
            </View>
            <ScrollView 
                style={{
                    margin: 10,
                    marginBottom: 50
                }}
            >   
                 
                {
                    totals&& Object.entries(totals)?.map(([key,value], i:number)=>{
                         return (
                        <View
                            key={i}
                            style={{flexDirection: 'row', justifyContent: 'space-between'}}
                        >
                            <Text style={{color: currTextColor}}>{(key.charAt(0).toLocaleUpperCase()+key.slice(1) ).replace(/([a-z](?=[A-Z]))/g, '$1 ')}</Text>
                            <Text style={{color: currTextColor}}>{value}</Text>
                        </View>
                        )
                    })
                }
            </ScrollView>

        </View>
    </View>)
    
}