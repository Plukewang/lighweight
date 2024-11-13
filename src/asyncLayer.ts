import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseProg, Workout, TrainingCycle, Trainingcycle, BuildTrainingCycle } from "./exercises";
import { Exercise } from "../types/ui";
import { readUserCycles } from "./readwrite";
/**
 * Abstract layer for dealing with async storage.
 * This primarily focuses on storing client-side incomplete info like forms that haven't been !!!sent without any private information!!!
 */

export const SyncWithOnline = async(override: boolean): Promise<string[]> =>{//use this when global app state is goes from online to offline mode.
    //gets all the available cycles from the cloud
    const keys = await AsyncStorage.getAllKeys();
    const onlineNames: string[] = []
    try{
        const cycles = await readUserCycles();//get a list of trainingcycles
        if (cycles.length===0) return []
        for(const cycle of cycles){//merge them with existing cycles
            let unconvertedName = cycle.name.replace(/([a-z])([A-Z])/g, '$1 $2')
            if(override){
                await AsyncStorage.setItem(cycle.name, JSON.stringify(cycle)) //just replace the item with the online one if we are overriding without saving.
                
            }else{
                if(! keys.includes(cycle.name.replace(/([a-z])([A-Z])/g, '$1 $2'))){//save the current offline versions instead and update the cloud version. Also unconvert the name
                    await AsyncStorage.setItem(unconvertedName, JSON.stringify(cycle))
                }
            }
            onlineNames.push(unconvertedName)
        }
        return onlineNames
    }catch(error){
        console.log(error)
        return []
    }
}


export type trainingCycleData = {
    names: string[]
    active: number
}

export const makeTrainingCycle = async ()=>{
    /**
     * Creates a training cycle when a user opens the create training cycle modal and hits save.
     * 
     * */    
    try{
        const trainingCycle = BuildTrainingCycle();//build function with a default starting date of today and a default week number of 4.
        const result = await AsyncStorage.setItem('trainingCycleTemplate', JSON.stringify(trainingCycle))//store as stringified json.
        return trainingCycle
    }catch(error){
        console.error(error);
    }
    
}

export const saveTrainingCycle = async (name: string, startDate: string, weeks: number, workoutScheme: Workout[])=>{
    try{
        const newTrainingCycle = TrainingCycle(startDate, weeks, workoutScheme, name, 1);
        const result = await AsyncStorage.setItem(name, JSON.stringify(newTrainingCycle));
        //now save the reference.
        const unsaveResult = await makeTrainingCycle();
    }catch(error){
        console.error(error)
    }
}

export const editTrainingCycle = async (name: string, startDate: string, weeks: number, workoutScheme: Workout[])=>{
    try{
        const newTrainingCycle = TrainingCycle(startDate, weeks, workoutScheme, name, 1);
        const result = await AsyncStorage.mergeItem(name, JSON.stringify(newTrainingCycle));
        //now save the reference.
        const unsaveResult = await makeTrainingCycle();
        return newTrainingCycle
    }catch(error){
        console.error(error)
    }
}


export const getTrainingCycle = async (name: string):Promise<Trainingcycle | null>=>{
    try{
        const result = await AsyncStorage.getItem(name)
        if(!result) return null
        let data = JSON.parse(result? result : '');
        return data;
    }catch(error){
        console.log(error);
        throw(error)
    }
    
}

export const getTrainingCycleTemplate = async():Promise<any>=>{
    try{
        const result = await AsyncStorage.getItem('trainingCycleTemplate')
        return result;
    }catch(error){
        console.log(error);
    }
}

export const deleteTrainingCycle = async(name: string): Promise<any>=>{
    try{
        const result = await AsyncStorage.removeItem(name);

    }catch(error){
        console.log(error)
    }
}
