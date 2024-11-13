import { View, Pressable, Text, TextInput } from "react-native";
import { MyText } from "./myText";
import { EditableInput } from "./editableInput";
import { WeightSelect } from "./weightSelect";
import { Exerciseprog, addSet, removeSet } from "../../src/exercises";
import { styles, darkstyles } from "../sessionstyle";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { setInfo } from "../../src/exercises";
import { UseAppStateStore } from "../../src/globalAppState";
import { AreYouSure } from "../../modals/areYouSure";
import { useCycleStore } from "../../src/trainingCycleTemplateStore";


interface ExerciseBlockProps{
    exercise: Exerciseprog
    week: number
    updateSet: (set: setInfo[])=>void
    day: string
    id: number
    updateTargets: (weight: number, reps: number) =>void
}

export const ExerciseBlock = ({exercise, week, updateSet, updateTargets, day, id}: ExerciseBlockProps): JSX.Element =>{

    const [set, setSet] = useState(exercise.setList.setList[exercise.currentWeek])//get the setlist from the exercise progression.
    const [done,setDone] = useState<boolean>(false);

    const scheme = useCycleStore((state)=>state.workoutScheme)
    const thisExercise = scheme.find((workout)=> workout.day === day)?.exercises[id]

    const [weight, setWeight] = useState(set[0].weight || exercise.startingWeight)
    const [reps, setReps] = useState(exercise.weightProgression+exercise.startingReps)
    const [int, setInt] = useState(exercise.weightProgression+exercise.startingIntensity)

    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const currTheme = theme=== 'Light'? styles : darkstyles

    const repArr = Array(26).fill(5);
    for(let i in repArr){
        repArr[i] += Number(i)
    }

    return(
        <Pressable style={{
            width: '90%',
            alignSelf: 'center',
            borderRadius: 8,
            borderWidth: 2,
            borderColor: !done? currTextColor: '#ECC640',
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            padding: 10,
            margin: 5,
            
            }}
            onPress={()=>{
                if(!done){
                    setDone(true)//highlight exercise as being done.
                }
                updateTargets(weight, reps)
                updateSet(set)
                //console.log(set)
            }}
        >

            <View
                style={{
                    width: '100%',
                }}
            >
                <MyText 
                    align="left"
                    size={16}
                    highlight={theme==='Light' ? false: 'white'}
                >
                    {exercise.exercise.name}
                </MyText>
            </View>

            <View style={currTheme.exerciseInfo}>

                <View style={currTheme.exerciseInfoCol2}>
                        <Text style={{color: currTextColor}}>
                            Weight: </Text>
                        <EditableInput 
                            variable={String(weight)}
                            onChangeText={(text)=>{
                                setWeight(Number(text))
                            }}
                            inputMode="numeric"
                            defaultItem={String(thisExercise?.startingWeight || 0 + (thisExercise?.weightProgression || 0))}
                        />
                </View>

                <View style={currTheme.exerciseInfoCol2}>
                        <Text style={{color: currTextColor}}> 
                             Reps: 
                        </Text>
                        <WeightSelect 
                            data={[1,2,3,4,5,6,7,8,9,10]} 
                            defaultItem={reps} 
                            onSelect={(item)=>{
                                setReps(Number(item))
                            }}
                        />
                </View>
               
            </View>

            <View style={currTheme.exerciseBlockSet}>
                <Text style={{color: currTextColor}}></Text>
                <Text style={{color: currTextColor}}>Weight</Text>
                <Text style={{color: currTextColor}}>Reps</Text>
            </View>
            
            {//list of sets for each exercise based on the number of sets
                set? set.map((currSet, i: number)=>{
                    return (
                    <View
                        key={i}
                        style={currTheme.exerciseBlockSet}
                    >   
                        <View>
                        <Text style={{color: currTextColor}}>Set {i+1}</Text>
                            <Pressable onPress={()=>{
                                removeSet(exercise, exercise.currentWeek, i)
                                setSet(set.filter((x:setInfo,j: number)=>i!==j))
                                }}
                            >
                                <Ionicons name="trash-outline" size={24} color={currTextColor} />
                            </Pressable>
                        </View>
                        <View>
                            {exercise.setType==='Straight' || exercise.setType==='Myo' && i ===0? 
                            
                                <TextInput
                                    placeholder={""+(currSet.weight? currSet.weight : exercise.startingWeight)}
                                    placeholderTextColor={currTextColor}
                                    style={styles.exerciseInput}
                                    inputMode="numeric"
                                    onEndEditing={(e)=>{
                                        setSet(set.map((set: setInfo, j: number)=>{
                                            if(i===j){
                                                return {...set, weight: Number(e.nativeEvent.text)}
                                            }else return set
                                        }))
                                        
                                    }}
                                />
                            : <></>
                            }
                            
                        </View>

                        
                        <View>
                            <WeightSelect 
                                data={repArr}
                                defaultItem={reps}
                                onSelect={(selectedItem: number)=>{
                                    setSet(set.map((set: setInfo, j: number)=>{
                                        if(i===j){
                                            return {...set, reps: Number(selectedItem)}
                                        }else return set
                                    }))
                                }}
                            />
                        </View>

                        
                    </View>
                )
                }) : <></>
            }
            
            <Pressable 
                style={{width: '100%', alignItems: 'center', height: 30, borderRadius:8}}
                onPress={()=>{
                    addSet(exercise, {weight: 0, reps: 0, intensity: 0}, exercise.currentWeek, )
                    setSet([...set, {weight: 0, reps: 0, intensity: 0}])
                }}    
            >   
                <View style={{width: '50%', backgroundColor: '#F3F3F3', alignItems: 'center', borderRadius: 8}}>
                    <Ionicons name="add" size={20} color="gray"  />
                </View>
            </Pressable>
            
             <View style={currTheme.exerciseInfoCol1}>
                    <Text style={{color: currTextColor}}>Intensity: </Text>
                    <WeightSelect 
                    data={[0,1,2,3,4,5,6,7,8,9,10]} 
                    defaultItem={int} 
                    onSelect={(selectedItem)=>{
                        setSet(set.map((set: setInfo, j: number)=>{
                            return {...set, intensity: Number(selectedItem)}

                        }))
                    }}/>
            </View>
            <View style={currTheme.exerciseInfoCol2}>
                
                    <Pressable 
                        onPress={()=>{
                            if(!done) setDone(true);
                        }}
                    >
                        <AreYouSure
                            warning="Update this week's weight and reps?"
                            action={()=>{
                            
                            updateTargets(weight, reps)
                            }}
                            exception={()=>{
                                return false
                            }}
                            >
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                            <Text style={{color: currTextColor}}>Done</Text>
                            <Ionicons name={done? "checkbox-sharp" : "checkbox-outline"} size={24} color="black" />
                        </View>
                        </AreYouSure>
                        
                    </Pressable>

                </View>
     

                
        </Pressable>
    )
}