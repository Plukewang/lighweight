
import { deleteTrainingCycle, getTrainingCycle } from "../../src/asyncLayer";
import { Text, View, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { editCycleProps } from "../../types/ui";
import { useCycleListStore, useCycleStore } from "../../src/trainingCycleTemplateStore";
import { AreYouSure } from "../../modals/areYouSure";
import { MyText } from "./myText";
import { useEffect, useState } from "react";
import { BuildTrainingCycle, Trainingcycle } from "../../src/exercises";
import { deleteUserCycle } from "../../src/readwrite";
import { UseAppStateStore } from "../../src/globalAppState";
import { CycleSummary } from "../../modals/cycleSummary";


export const EditCycle = ({name, update, num}: editCycleProps):JSX.Element =>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const [summary, openSummary] = useState(false) //control the cycle summary page

    const removeName = useCycleListStore((state)=>state.removeCycleName)
    const changeActive = useCycleListStore((state)=>state.changeActive)
    const active =  useCycleListStore((state)=>state.active)

    const cycleSets= useCycleStore((state)=>state.totalSets)

    const cycleWeeks = useCycleStore((state)=>state.weeks)
    const cycleWorkouts = useCycleStore((state)=>state.workoutScheme)

    const [thisCycle, setThisCycle] = useState(BuildTrainingCycle());

    const cycle = useCycleStore((state)=>state.loadCycle)
    const clearCycle = useCycleStore((state)=>state.clearCycle)
    const currProgress = useCycleStore((state)=>state.progress)/(cycleWeeks*cycleWorkouts.length)
    
    useEffect(()=>{
        async function getCycle(){
            const result = await getTrainingCycle(name);
            if(result) {
                setThisCycle(result)
                cycle(result)
            };
        }
        getCycle()
    },[active])

    return(
        <View
            style={{
                height: 100,
                marginBottom: 50,
            }}
        >

        <View
            style={{
                gap: 0,
                height: 100, 
                shadowColor: currTextColor,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 5,  
                elevation: 5,
            }}
        >
            <AreYouSure
                warning='Start this training cycle?'
                exception={()=>{return num!==active}}
                action={()=>{
                    changeActive(num)
                    
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: 100,
                        backgroundColor: currBackgroundColor,
                        borderWidth: 2,
                        borderColor: currTextColor,
                        padding: 10,
                        borderRadius: 8,
                    }}
                >
                    <View>
                    <MyText size={20} highlight={num === 0} align="left">{name}</MyText>
                    <Text style={{color: currTextColor}}>{cycleSets} Weekly Sets</Text>
                    </View>

                    
                    <View style={{
                        flexDirection:'row',
                        flexWrap: 'wrap',
                        }}
                    >
                        <Pressable
                            style={{
                                padding: 10,
                                justifyContent: 'center',

                            }}
                            onPress={()=>{
                                openSummary(true)
                            }}
                        >
                            <AntDesign name="questioncircle" size={24} color={currTextColor} />
                            <CycleSummary control = {summary} close = {()=>{
                                openSummary(false)
                            }}/>
                        </Pressable>
                        
                        <Pressable
                            style={{
                                padding: 10,
                                justifyContent: 'center',

                            }}
                            onPress={
                                async():Promise<void>=>{
                                    update();
                                    if(name) {const result = await getTrainingCycle(name);}
                                    
                                }
                            }
                        >
                            <AntDesign name="edit" size={24} color={currTextColor} />
                        </Pressable>
                        <View
                            style={{
                                padding: 10,
 
                            }}
                        >
                            <AreYouSure
                                warning="Are you sure you want to delete this training cycle?"
                                action={():void=>{
                                    if(name){
                                        removeName(name)
                                        deleteTrainingCycle(name);
                                        deleteUserCycle(name)
                                        clearCycle();
                                    }
                                }}

                            >
                                
                                <AntDesign name="delete" size={24} color={currTextColor} />   
                                
                            </AreYouSure>
                            
                        </View>
                        
                    </View>
                               
                    <View style={{ width:'100%', height: 5}}>
                        <View style={{margin:0, padding: 0, backgroundColor: '#ECC640', height: '100%', width: `${(currProgress+0.01)*100}%`}}></View>
                    </View>   
                    
                </View>
            </AreYouSure>
            
            
        </View>
        </View>
        
        
    )
}