import { SetStateAction, useState } from "react";
import { ExerciseProg, Workout, Exerciseprog } from "../src/exercises";
import { useCycleStore } from "../src/trainingCycleTemplateStore";
import { Pressable, Text, View, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { EditableInput } from "../theme/ui/editableInput";
import { WeightSelect } from "../theme/ui/weightSelect";
import { UseAppStateStore } from "../src/globalAppState";

interface adjustexerciseprops {
    editedExercise: Exerciseprog
    day: Workout['day']
    id: number
}

export const AdjustExercise = ({editedExercise, day, id}: adjustexerciseprops): JSX.Element =>{
    //theme stuff
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    //actual state variables
    const [open,setOpen ] = useState<boolean>(false)
    const [exerciseWeight, setExerciseWeight] = useState<number>(editedExercise.startingWeight)
    const [exerciseReps, setExerciseReps] = useState<number>(editedExercise.startingReps)
    const [increment, setIncrement] = useState<number>(editedExercise.weightIncrement)
    const [repRange, setRepRange] = useState<{start: number, end: number}>(editedExercise.repRange)
    const [sets, setSets] = useState<number>(editedExercise.sets)
    const [setType, setSetType] = useState<'Straight' | 'Myo' | 'Giant' | 'Drop' | ''>(editedExercise.setType)
    const [weightType, setWeightType] = useState<'lbs'|'kgs'>('lbs');
    const [intensity, setIntensity] = useState<6|7|8|9>(editedExercise.startingIntensity)
    //these are for dropdown selectors
    const incrementskg = [1,2.25, 4.5]
    const incrementslb = [2.5, 5, 10]
    const setTypes = ['Straight' , 'Myo' , 'Giant' , 'Drop' ,]
    const repArr = Array(26).fill(5);
    for(let i in repArr){
        repArr[i] += Number(i)
    }

    const adjustExercise = useCycleStore((state)=>state.updateSessionExercise)
    const removeExercise = useCycleStore((state)=>state.removeSessionExercise)


    return(
        <View 
            style={{
                flex: 2,
                width: '50%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                backgroundColor: currBackgroundColor,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <Pressable
                    onPress={()=>setOpen(true)}
                    style={{flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >

                    {
                    //open the modal
                        
                        <Ionicons name="create-outline" size={24} color={currTextColor} />
                    }
                </Pressable>

                <Pressable
                    onPress={()=>{
                        removeExercise(editedExercise.exercise.name, day)
                        setOpen(false)
                    }}
                    style={{flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >

                    {
                    //delete the exercise
                        
                        <Ionicons name="trash-outline" size={24} color={currTextColor} />
                    }
                </Pressable>
            </View>
            

            <Modal
                visible={open}
                animationType="slide"
                transparent
            >
                <View
                    style={{
                        position: 'absolute',
                        width: '80%',
                        height: '80%',
                        left: '10%',
                        top: '10%',
                        backgroundColor: currBackgroundColor,
                        borderRadius: 8,
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 20,
                    }}
                >
                    
                    {
                        //starting weight selector
                    }
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: currTextColor}}>{editedExercise.exercise.name}</Text>
                    
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                    
                        <Text style={{color: currTextColor}}>Starting Weight: </Text><EditableInput variable={''+exerciseWeight} defaultItem = {exerciseWeight+''} onChangeText={(text)=>setExerciseWeight(Number(text))} inputMode="numeric"/>
                        {
                            //buttons to set whether to put things in lbs or kg
                        }
                        <Pressable 
                            style={{flexDirection: 'row', alignItems: 'center',margin: 10}}
                            onPress={()=>{
                                setWeightType('lbs')
                            }}
                        >
                            <Text style={{color: currTextColor}}>lbs</Text>
                            <Ionicons name={weightType==="lbs"? "checkbox" : "square-outline"} size={24} color={currTextColor} />
                        </Pressable>
                        <Pressable 
                            style={{flexDirection: 'row', alignItems: 'center',margin: 10}}
                            onPress={()=>{
                                setWeightType('kgs')
                            }}
                        >
                            <Text style={{color: currTextColor}}>kgs</Text>
                            <Ionicons name={weightType==="kgs"? "checkbox" : "square-outline"} size={24} color={currTextColor} />
                        </Pressable>
                    </View>
                    
                    {
                        //starting reps selector
                    }
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        
                        <Text style={{color: currTextColor}}>Starting Reps: </Text><EditableInput variable={''+exerciseReps} defaultItem={exerciseReps+''} onChangeText={(text)=>setExerciseReps(Number(text))} inputMode="numeric"/>
                    </View>
                    {
                        //Rep range seelector
                    }
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{color: currTextColor}}> Rep Range: </Text>
                        <WeightSelect 
                            data={repArr}
                            defaultItem={repRange.start}
                            onSelect={(selectedItem: number)=>{
                                setRepRange({start: selectedItem, end: repRange.end})
                            }}
                        />
                        <Text> to </Text>
                        <WeightSelect 
                            data={repArr.slice((Number(repRange.start)-5)+1)}
                            defaultItem={repRange.end}
                            onSelect={(selectedItem: number)=>{
                                setRepRange({start: repRange.start, end: selectedItem})
                            }}
                        />
                    </View>
                    {
                        //Weight increment selector
                    }
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{color: currTextColor}}>Weight Increment: </Text>
                        <WeightSelect 
                            data={weightType==='lbs'? incrementslb: incrementskg}
                            defaultItem={increment}
                            onSelect={(selectedItem: number)=>{
                                setIncrement(selectedItem)
                            }}
                        />
                        <Text style={{color: currTextColor}}>{weightType}</Text>
                    </View>
                    
                    
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{color: currTextColor}}>Starting Intensity: </Text>
                        <WeightSelect
                            data={[7,8,9]}
                            defaultItem={intensity}
                            onSelect={(selectedItem: 7|8|9)=>{
                                setIntensity(selectedItem)
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{color: currTextColor}}>Sets: </Text>
                        <WeightSelect
                            data={[1,2,3,4,5,6,7,8,9,10,11,12]}
                            defaultItem={sets}
                            onSelect={(selectedItem: number)=>{
                                setSets(selectedItem)
                            }}
                        />
                        <Text style={{color: currTextColor}}>Type: </Text>
                        <WeightSelect
                            data={['Straight' , 'Myo' , 'Giant' , 'Drop' ]}
                            defaultItem={setType}
                            onSelect={(selectedItem: 'Straight' | 'Myo' | 'Giant' | 'Drop' | '')=>{
                                setSetType(selectedItem)
                            }}
                        />
                    </View>
                    
                    <Pressable
                        style={{padding: 20}}
                        onPress={()=>{
                            setOpen(false)
                            //next, create a new exerciseprog object and set it to the correct workout scheme.
                            const adjustedProg = ExerciseProg(
                                editedExercise.exercise,
                                intensity, 
                                exerciseWeight,
                                exerciseReps,
                                0,
                                0,
                                repRange,
                                sets,
                                increment,
                                0,
                                setType

                            )
                            console.log(id)
                            adjustExercise(adjustedProg, day, id)
                        }}
                    >
                        <Ionicons name="exit-outline" size={24} color={currTextColor}/>
                    </Pressable>

                </View>

                

            </Modal>
        </View>
    )
}

