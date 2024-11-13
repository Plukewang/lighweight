import { useEffect, useState } from "react";
import { CycleProps } from "../../types/home/home";
import { Pressable, Text, View } from "react-native";
import { styles, darkstyles } from "../../theme/cyclestyle";
import { MyText } from "../../theme/ui/myText";
import { FontAwesome6 } from '@expo/vector-icons';
import { CreateCycle } from "../../modals/createCycle";
import { EditCycle } from "../../theme/ui/editCycle";

//asyncstorage import
import { getTrainingCycleTemplate, getTrainingCycle, SyncWithOnline } from "../../src/asyncLayer";
import { useCycleListStore, useCycleStore } from "../../src/trainingCycleTemplateStore";
import { ScrollView } from "react-native-gesture-handler";
import { readUserCycles } from "../../src/readwrite";
import { UseAppStateStore } from "../../src/globalAppState";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const currTheme = theme=== 'Light'? styles : darkstyles

    const cycleList = useCycleListStore<string[]>((state)=>state.cycles)
    const syncList = useCycleListStore((state)=>state.syncCycleList)//get the active cycle.

    const loadData = useCycleStore((state)=>state.loadCycle)
    const clear = useCycleStore((state)=>state.clearCycle)
    
    const offline = UseAppStateStore((state)=>state.offline)

    //effect syncing with async storage.
    useEffect(()=>{
        async function updateCycles(){
            const result = await getTrainingCycleTemplate();
        }
        updateCycles();
    },[createCycleModal]);

    useEffect(()=>{//update cycle list when offline or online changes.
        async function updateCycleList(){
            try{    
                if(!offline){
                    const result = await SyncWithOnline(true)
                    const newList = await AsyncStorage.getAllKeys()
                    syncList(result)
                }
            }catch(error){
                throw error
            }
        }
        updateCycleList();
    },[offline])


    return (
    <View style={currTheme.container}>
        <CreateCycle 
            template={template}
            num = {edited}
            control={createCycleModal}
            close={//function to close the create cycle modal
                ()=>{
                    setTemplate({name: 'Default Cycle', startDate: dateString, isTemplate: true});
                    setCreateCycleModal(!createCycleModal);
                    if(template.isTemplate) clear()
                }}
        />
        {//prompt the user to create a new training cycle if they haven't made one yet.
        !cycleList.length ? <>
            <MyText
                size = {16}
                highlight = {theme==='Light'?false: 'white'}
                align = {"center"}  
            >
                No Training Cycles Found. Make your own here!
            </MyText>

            
            </>
            :
            <ScrollView
                contentContainerStyle={{
                    padding: '10%',
                    justifyContent: 'flex-start'
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