import { Calendar } from "react-native-calendars";
import { Pressable, Modal, Text, View } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface calendarProps{
    variable: string
    setter: (variable: string) =>void
}

export const CalendarInput = ({variable, setter}: calendarProps ) =>{
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];//this gets the YYYY-MM-DD from the ISO YYYY-MM-DDTHH:mm:ss.sssZ

    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<string>(currentDateString);

    return(
        <View> 
            <Modal
                visible={open}
                animationType="slide"
                transparent = {true}
            >
                <View
                    style={{
                        width: '80%',
                        height: '55%',
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        position: "absolute",
                        left: '10%',
                        bottom: '20%',
                        padding: 10,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style= {{alignSelf: 'center'}}   >{date}</Text>

                    <Calendar
                        onDayPress={(day)=>{
                            //for setting the starting date. Setter is the upper level setStartDate.
                            setDate(day.dateString);
                            setter(day.dateString);
                        }}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        enableSwipeMonths={true}
                        markedDates={{
                            [date]: {selected: true, disableTouchEvent: true}
                          }} 
                    />

                    <Pressable
                        onPress={()=>setOpen(false)}
                        style= {{alignSelf: 'center', padding: 10}}    
                    >
                        <Text><Ionicons name="exit-outline" size={24} color="gray" /></Text>
                    </Pressable>
                </View>
            </Modal>

            <Pressable
                onPress={(): void=>setOpen(true)}
                style={{
                    flexDirection: 'row', 
                    gap: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text>Starting Date: {variable}</Text>
                <MaterialIcons name="edit-calendar" size={24} color="gray" />
            </Pressable>
            

            
        </View>
    )
}