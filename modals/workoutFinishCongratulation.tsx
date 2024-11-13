import { useState } from "react"
import { View, Modal, Pressable, Text } from "react-native"
import { MyText } from "../theme/ui/myText"
import { Ionicons } from '@expo/vector-icons';
import { UseAppStateStore } from "../src/globalAppState";
import { ScrollView } from "react-native-gesture-handler";
import { useCycleStore } from "../src/trainingCycleTemplateStore";
import { getAllProgressions } from "../src/exercises";

interface finishWorkoutProps{
    control: boolean
    close: ()=>void
}
export const FinishWorkout = ({control,close}: finishWorkoutProps):JSX.Element=>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'

     
    return (
            <Modal
                visible={control}
                transparent={false}
                animationType="slide"
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: currBackgroundColor,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons name="checkmark-circle-outline" size={30} color={currTextColor} style={{margin: 10,}} />
                    <MyText
                        size={24}
                        align="center"
                        highlight={true}
                    >
                        You're Done For The Day!
                    </MyText>
                    <Text style={{color: currTextColor}} >Take a well-deserved rest of the day off.</Text>
                    <Pressable onPress={close} style={{padding: 20}}>
                        <Ionicons name="exit-outline" size={24} color={currTextColor} />
                    </Pressable>
                </View>
            </Modal>
    )
}

export const FinishCycle = ({control,close}: finishWorkoutProps):JSX.Element=>{
    const [open,setOpen] = useState<boolean>(control)
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const units = UseAppStateStore((state)=>state.units)
    const workouts = useCycleStore((state)=>state.workoutScheme)
    const progressResults = getAllProgressions(workouts)
    
    return (
            <Modal
                visible={open}
                transparent={false}
                animationType="slide"
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: currBackgroundColor,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons name="checkmark-circle-outline" size={30} color={currTextColor} style={{margin: 10,}} />
                    <MyText
                        size={24}
                        align="center"
                        highlight={true}
                    >
                        Training Cycle Complete!
                    </MyText>
                    <View style={{height: 200, flexDirection: 'column', justifyContent: 'center'}}>
                    <ScrollView
                        contentContainerStyle={{
                            justifyContent: 'center',
                        }}
                    >
                        {
                            progressResults?.map((progress,i)=>{
                                return (<View key={i} style={{height: 15}}> 
                                    <Text >
                                    {progress.name}: +{progress.weight}{units}, +{progress.reps} reps
                                </Text>
                                    </View>)
                            })
                        }
                    </ScrollView>
                    </View>
                    

                    <Text style={{color: currTextColor}} >Great job! Take a week to deload and recover.</Text>
                    <Pressable onPress={()=>{
                        setOpen(false)
                    }} style={{padding: 20}}>
                        <Ionicons name="exit-outline" size={24} color={currTextColor} />
                    </Pressable>
                </View>
            </Modal>
    )
}