import { UseAppStateStore } from "../src/globalAppState";
import { Ionicons } from '@expo/vector-icons';
import { useCycleStore, } from "../src/trainingCycleTemplateStore";
UseAppStateStore
import { View, Pressable, Text, Modal } from "react-native";
import { CycleStats } from "../theme/ui/cycleStats";

interface props{
    control: boolean
    close: ()=>void
}

export const CycleSummary = ({control,close}: props):JSX.Element=>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'

    const name = useCycleStore((state)=>state.name)
    const cycle = useCycleStore((state)=>state.workoutScheme)
     
    return (
            <Modal
                visible={control}
                transparent={false}
                animationType="slide"
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: currBackgroundColor,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Text style={{textAlign: 'center', color: currTextColor}}>Cycle Summary: {name}</Text>
                    

                    <CycleStats 
                        cycle = {cycle}
                    />
                    
                    <Pressable onPress={close} style={{padding: 20}}>
                        <Ionicons name="exit-outline" size={24} color={currTextColor} />
                    </Pressable>
                </View>
            </Modal>
    )
}