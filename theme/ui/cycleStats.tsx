import { useState } from "react";
import { cycleStatsProps } from "../../types/ui"
import { AnalyzeWorkout, Workout, createVolumes, Volumes } from "../../src/exercises"
import { View, Pressable, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';

export const CycleStats = ({cycle}: cycleStatsProps): JSX.Element =>{

    const [open, setOpen] = useState(false)

    const workoutScheme = cycle.workoutScheme;
    const weeklyVolumes = workoutScheme.map((workout: Workout, i: number)=>{//get an array of volumes for each day of the week to receeive a workout volume object.
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

    const totals = weeklyVolumes.reduce(accumulator, createVolumes())//use the above function to reduce to a single Volumes object.
    return(
    <View
        style={{
            width: '100%',
            height: 200,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            
        }}
    >
        <Pressable
            onPress={()=>{
                setOpen(!open)
            }}
            style={{
                width: '100%',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderBottomLeftRadius: open? 0 : 8,
                borderBottomRightRadius: open? 0: 8,
            }}
        >
            <Feather name="chevrons-down" size={24} color="gray"/>
        </Pressable>
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: '100%',
                height: open? '100%': 0,
                backgroundColor: 'white',
                borderBottomEndRadius: 8,
                borderBottomLeftRadius: 8,
            }}
        >
            <ScrollView 
                style={{
                    margin: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                }}
            >   
                 <Text style={{textAlign: 'center', fontSize: 16,}}>Sets per muscle</Text>
                 <View
                    style={{flexDirection: 'row', justifyContent: 'space-between'}}
                >
                    <Text style={{fontWeight: 'bold'}}>Muscle</Text>
                    <Text style={{fontWeight: 'bold'}}>Sets</Text>
                 </View>
                {
                    Object.entries(totals).map(([key,value], i:number)=>{
                        if (value > 0) return (
                        <View
                            key={i}
                            style={{flexDirection: 'row', justifyContent: 'space-between'}}
                        >
                            <Text>{(key.charAt(0).toLocaleUpperCase()+key.slice(1) ).replace(/([a-z](?=[A-Z]))/g, '$1 ')}</Text>
                            <Text>{value}</Text>
                        </View>
                        )
                    })
                }
            </ScrollView>

        </View>
    </View>)
    
}