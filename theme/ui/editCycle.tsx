
import { deleteTrainingCycle, getTrainingCycle } from "../../src/asyncLayer";
import { Text, View, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { editCycleProps } from "../../types/ui";
import { useCycleListStore, useCycleStore } from "../../src/trainingCycleTemplateStore";
import { AreYouSure } from "../../modals/areYouSure";
import { MyText } from "./myText";
import { CycleStats } from "./cycleStats";
import { useEffect, useState } from "react";
import { BuildTrainingCycle, Trainingcycle } from "../../src/exercises";
import { deleteUserCycle } from "../../src/readwrite";
export const EditCycle = ({name, update, num}: editCycleProps):JSX.Element =>{

    const removeName = useCycleListStore((state)=>state.removeCycleName)
    const changeActive = useCycleListStore((state)=>state.changeActive)
    const active =  useCycleListStore((state)=>state.active)

    const cycleSets= useCycleStore((state)=>state.totalSets)
    const cycleDate = useCycleStore((state)=>state.startDate)
    const cycleWeeks = useCycleStore((state)=>state.weeks)


    const [thisCycle, setThisCycle] = useState(BuildTrainingCycle());

    const cycle = useCycleStore((state)=>state.loadCycle)
    const clearCycle = useCycleStore((state)=>state.clearCycle)
    
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
                gap: 0,
                height: 100
            }}
        >
            <AreYouSure
                warning='Start this training cycle?'
                action={()=>{
                    changeActive(num)
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: 100,
                        backgroundColor: active != num? '#F3F3F3' : 'white',
                        padding: 10,
                        borderRadius: 8,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                >
                    <View>
                    <MyText size={20} highlight={active === num} align="left">{name}</MyText>
                    <Text>{cycleSets} Weekly Sets</Text>
                    </View>

                    
                    <View style={{
                        flexDirection:'row'
                    }}>
                        <Pressable
                            style={{
                                padding: 10,
                                justifyContent: 'center',

                            }}
                            onPress={
                                async():Promise<void>=>{
                                    if(name) {const result = await getTrainingCycle(name);}
                                    update();
                                }
                            }
                        >
                            <AntDesign name="edit" size={24} color="gray" />
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
                                
                                <AntDesign name="delete" size={24} color="gray" />   
                                
                            </AreYouSure>
                        </View>
                        
                    </View>
                    
                </View>
            </AreYouSure>

            <CycleStats cycle={thisCycle}/>
            </View>
        
    )
}