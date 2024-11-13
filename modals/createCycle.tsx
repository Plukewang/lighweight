import {useState, useRef} from "react";
import { Modal, Text, Pressable, TextInput, Keyboard, View, Alert } from "react-native";
import { CreateCycleProps } from "../types/home/home";
import { styles, darkstyles } from "../theme/cyclestyle";
import { EditableInput } from "../theme/ui/editableInput";
import { CalendarInput } from "../theme/ui/calendarInput";
import { AddSession } from "./addSession";
import { Workout } from "../src/exercises";
//import global state store
import { useCycleStore } from "../src/trainingCycleTemplateStore";
import { AreYouSure } from "./areYouSure";
import { editTrainingCycle, getTrainingCycle, saveTrainingCycle } from "../src/asyncLayer";
import { useCycleListStore } from "../src/trainingCycleTemplateStore";
import { WeightSelect } from "../theme/ui/weightSelect";
import { UseAppStateStore } from "../src/globalAppState";

import { addUserCycle, editUserCycle } from "../src/readwrite";

//control is the control state variable used to open the modal.
    //close is the passed set function to control the state.
export const CreateCycle: React.FC<CreateCycleProps>=  ({template,num, control, close}: CreateCycleProps) =>{
    
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const currTheme = theme=== 'Light'? styles : darkstyles
    
    const defaultName = useCycleStore((state)=>state.name)//default cycle name
    const dateString = useCycleStore((state)=>state.startDate)//this gets the YYYY-MM-DD from the ISO YYYY-MM-DDTHH:mm:ss.sssZ
    const defaultWeeks = useCycleStore((state)=>state.weeks)//get the number of weeks the cycle lasts.
    const defaultScheme = useCycleStore((state)=>state.workoutScheme)//get the number of weeks the cycle lasts

    const setName = useCycleStore((state)=>state.updateCycleName)
    const setStartDate = useCycleStore((state)=>state.updateCycleStartingDate)
    const setWeeks = useCycleStore((state)=>state.updateCycleWeeks)
    const clearCycle = useCycleStore((state)=>state.clearCycle)

    

    //information to fill in to create a cycle LEGACY: keep in case zustand goes ass sideways.
    //const [cycleName, setCycleName] = useState<string>(defaultName);
    //const [startDate, setStartDate] = useState<string>(dateString);//TODO: create date type in home.ts
    //const [weeks, setWeeks] = useState<number>(defaultWeeks);
    //const [workouts, setWorkouts] = useState([])//this is for workouts

    const cycleNames = useCycleListStore((state)=>state.cycles)

    const addName = useCycleListStore((state)=>state.addCycleName)
    const editName = useCycleListStore((state)=>state.updateCycleName)

    const nameRef = useRef<TextInput>(null);//for focusing on training cycle name

    const days: Workout['day'][] =  ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun']//each day of the week

    return(//TODO: Set all these items in asyncstorage so a user can go back to it later
        <Modal
            visible = {control}  
            transparent={true}  
            animationType="fade"
        >
        <Pressable
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
            }}
            onPress={close}
        >

            <Pressable 
                    onPress={//this lets us dismiss keyboard.
                        Keyboard.dismiss} 
                    style={currTheme.modal}
            >
                {//title
                }
                <Text style={{textAlign: 'center', fontSize: 16, margin: 10, color: currTextColor}}>Create a Training Cycle</Text>

                {
                }
                <EditableInput 
                    variable={defaultName}
                    inputMode="default"
                    defaultItem={'Training Cycle '+ cycleNames.length+1}
                    onChangeText={(text) => { 
                            setName(text);
                        }}
                />

                {//starting date and number of weeks TODO: connect to a form
                }
                <View style={currTheme.date}>

                    <CalendarInput 
                        variable={dateString}
                        setter={setStartDate}
                    />

                    <Text style={{color: currTextColor}}>Number of Weeks:</Text>

                    <WeightSelect
                        data={Array(12).fill(0).map((x,i)=>x+=i+1)}
                        defaultItem={defaultWeeks || 4}
                        onSelect={(item)=>{
                            setWeeks(item)
                        }}
                    />

                </View>

                {//prompt user to add workout sessions to their week
                days.map((day,i)=>{
                    return <AddSession key={i} weekday={day}/>
                })
                }

                {
                    //save and exit buttons
                }
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <Pressable
                        style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center'
                        }}
                    >
                        <AreYouSure
                            warning={template.isTemplate? 'Save this training cycle?':'Save changes?'}
                            action={async ()=>{
                                    
                                    if(template.isTemplate){//save it as a template for a new cycle
                                        if(!cycleNames.some((name: string)=>name===defaultName)){
                                            saveTrainingCycle(defaultName, dateString, defaultWeeks, defaultScheme);
                                            addName(defaultName)
                                            
                                            const result = await getTrainingCycle(defaultName);
                                            if(result) addUserCycle(result);
                                        }else{
                                            Alert.alert('cannot have the same name')
                                            close()
                                        }
                                        
                                    }else{//save it to the original cycle and also update the backend version.
                                        
                                        try{
                                            const result = await editTrainingCycle(defaultName, dateString, defaultWeeks, defaultScheme);
                                            editName(defaultName, num)
                                            if(result) editUserCycle(template.name, result)
                                        }catch(error){
                                            throw(error)
                                        }
                                        
                                    }
                                    clearCycle()
                                    close();
                                
                            }}
                        >
                            <Text style={{color: currTextColor}}>Save</Text>
                        </AreYouSure>
                    </Pressable>

                    <Pressable
                        onPress={close}
                        style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{textAlign: 'center', color: currTextColor}}>Close</Text>
                    </Pressable>
                </View>
                 
            </Pressable>
                
            
            
            
        </Pressable>
  
        </Modal>
    )
}   