import { Pressable, Text } from "react-native";
import { styles, darkstyles } from "../homestyle";
import { UseAppStateStore } from "../../src/globalAppState";
interface settingsButtonprops{
    press: ()=>void
    buttonTitle: string
    important?: boolean
}

export const SettingsButton = ({press, buttonTitle, important}:settingsButtonprops) =>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currTheme = theme === 'Light' ? styles: darkstyles
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'

    return(
        <Pressable 
            style={currTheme.button}
            onPress={press}
        >
            <Text 
                style={{
                    textAlign:'center',
                    fontSize: 16,
                    color: !important? currTextColor : 'red'
                }}
            >
                {buttonTitle}
            </Text>
        </Pressable>
    )
}