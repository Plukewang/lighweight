import { View, Pressable, Text, TextInput } from "react-native";
import { MyText } from "./myText";
import { EditableInput } from "./editableInput";
import { WeightSelect } from "./weightSelect";
import { Exerciseprog, addSet, removeSet } from "../../src/exercises";
import { styles } from "../sessionstyle";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { setInfo } from "../../src/exercises";
interface ExerciseBlockProps{
    exercise: Exerciseprog
    updateSet: (set: setInfo[])=>void
}

export const ExerciseBlock = ({exercise, updateSet}: ExerciseBlockProps): JSX.Element =>{

    const [set, setSet] = useState(exercise.setList.setList[exercise.currentWeek])//get the setlist from the exercise progression.
    const [done,setDone] = useState<boolean>(false);

    const expectedWeight = exercise.weightProgression+exercise.startingWeight
    const expectedReps = exercise.startingReps+exercise.repProgression
    const expectedIntensity = exercise.startingIntensity

    const [targets, setTargets] = useState( {weight: expectedWeight,reps: expectedReps, intensity: expectedIntensity})
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
            borderColor: !done? '#F3F3F3': '#ECC640',
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            padding: 10,
            margin: 5,
            }}
            onPress={()=>{
                setDone(!done)//highlight exercise as being done.
                updateSet(set)
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
                    highlight={false}
                >
                    {exercise.exercise.name}
                </MyText>
            </View>

            <View style={styles.exerciseInfo}>

                <View style={styles.exerciseInfoCol2}>
                        <Text>
                            Weight: </Text>
                        <EditableInput 
                            variable={String(expectedWeight)}
                            onChangeText={(text)=>{
                                setSet([])
                            }}
                            inputMode="numeric"
                        />
                </View>

                <View style={styles.exerciseInfoCol2}>
                        <Text>
                             Reps: 
                        </Text>
                        <WeightSelect 
                            data={[1,2,3,4,5,6,7,8,9,10]} 
                            defaultItem={expectedReps} 
                            onSelect={()=>{
                                //todo: set the new reps here
                            }}
                        />
                </View>
               
            </View>

            <View style={styles.exerciseBlockSet}>
                <Text></Text>
                <Text>Weight</Text>
                <Text>Reps</Text>
            </View>
            
            {//list of sets for each exercise based on the number of sets
                set? set.map((currSet, i: number)=>{
                    return (
                    <View
                        key={i}
                        style={styles.exerciseBlockSet}
                    >   
                        <View>
                        <Text>Set {i+1}</Text>
                            <Pressable onPress={()=>{
                                removeSet(exercise, exercise.currentWeek, i)
                                setSet(set.filter((x:setInfo,j: number)=>i!==j))
                                }}
                            >
                                <Ionicons name="trash-outline" size={24} color="black" />
                            </Pressable>
                        </View>
                        <View>
                            {exercise.setType==='Straight' || exercise.setType==='Myo' && i ===0? 
                            
                                <TextInput
                                    placeholder={""+(currSet.weight? currSet.weight : exercise.startingWeight)}
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
                                defaultItem={expectedReps}
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
            
             <View style={styles.exerciseInfoCol1}>
                    <Text>Intensity: </Text>
                    <WeightSelect 
                    data={[0,1,2,3,4,5,6,7,8,9,10]} 
                    defaultItem={expectedIntensity} 
                    onSelect={(selectedItem)=>{
                        setSet(set.map((set: setInfo, j: number)=>{
                            return {...set, intensity: Number(selectedItem)}

                        }))
                    }}/>
            </View>

            <View style={styles.exerciseInfoCol2}>
                <Pressable 
                    style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
                    onPress={()=>{
                        setDone(!done);
                    }}
                >
                    <Text>Done</Text>
                    <Ionicons name={done? "checkbox-sharp" : "checkbox-outline"} size={24} color="black" />
                </Pressable>
            </View>

                
        </Pressable>
    )
}