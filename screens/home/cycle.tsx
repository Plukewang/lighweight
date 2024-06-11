import { useEffect, useState } from "react";
import { CycleProps } from "../../types/home/home";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../theme/cyclestyle";
import { MyText } from "../../theme/ui/myText";
import { FontAwesome6 } from '@expo/vector-icons';
import { CreateCycle } from "../../modals/createCycle";
import { EditCycle } from "../../theme/ui/editCycle";

//asyncstorage import
import { getTrainingCycleTemplate, getTrainingCycle } from "../../src/asyncLayer";
import { useCycleListStore, useCycleStore } from "../../src/trainingCycleTemplateStore";
import { ScrollView } from "react-native-gesture-handler";

const date = new Date();
const dateString = date.toISOString().split('T')[0];

export interface template {
    name: string
    startDate: string
    isTemplate: boolean
}

export const Cycle = ({navigation, route}: CycleProps)=>{

    const [createCycleModal, setCreateCycleModal] = useState<boolean>(false);//for opening the create a training cycle modal
    const [template, setTemplate] = useState<template>({name: 'Default Cycle', startDate: dateString, isTemplate: true});//to see if this is a new thing or an edit. Defaults to a template aka true. False when opened another way.
    const [edited, setEdited] = useState<number>(0)

    const cycleList = useCycleListStore<string[]>((state)=>state.cycles)
    const activeCycle = useCycleListStore<number>((state)=>state.active)//get the active cycle.

    const loadData = useCycleStore((state)=>state.loadCycle)
    
    
    //effect syncing with async storage.
    useEffect(()=>{
        async function updateCycles(){
            const result = await getTrainingCycleTemplate();
        }
        updateCycles();
    },[createCycleModal]);

    return (
    <View style={styles.container}>
        <CreateCycle 
            template={template}
            num = {edited}
            control={createCycleModal}
            close={//function to close the create cycle modal
                ()=>{
                    setTemplate({name: 'Default Cycle', startDate: dateString, isTemplate: true});
                    setCreateCycleModal(!createCycleModal);
                }}
        />
        {//prompt the user to create a new training cycle if they haven't made one yet.
        !cycleList.length ? <>
            <MyText
                size = {16}
                highlight = {false}
                align = {"center"}  
            >
                No Training Cycles Found. Make your own here!
            </MyText>

            
            </>
            :
            <ScrollView
                style={{
                    padding: '10%',

                }}
            >
                {cycleList.map((cycle, i)=>{
                    return <EditCycle 
                        name={cycle} 
                        num = {i}
                        key = {i} 
                        update={
                            async ()=>{
                                const data = await getTrainingCycle(cycle)
                                if (data) setTemplate({name: data.name, startDate: data.startDate, isTemplate: false})//this makes the createcycle modal display options for something that isn't a template.
                                
                                setEdited(i)

                                if(data) loadData(data)
                                setCreateCycleModal(true);
                            }
                        }/>
                })}
            </ScrollView>

        }
        <Pressable 
                style={styles.createButton}
                onPress={()=>setCreateCycleModal(true)}
            >
                <FontAwesome6 name="add" size={24} color="#ECC640" />
                <MyText
                    size = {16}
                    highlight= {true}
                    align="center"
                >
                    {!cycleList.length? 'Create a training cycle': 'Create another training cycle'}
                </MyText>
        </Pressable>
    </View>)
}