import { Pressable, Text } from "react-native";
import { styles } from "../homestyle";

interface settingsButtonprops{
    press: ()=>void
    buttonTitle: string
}

export const SettingsButton = ({press, buttonTitle}:settingsButtonprops) =>{
    return(
        <Pressable 
            style={styles.button}
            onPress={press}
        >
            <Text 
                style={{
                    textAlign:'center',
                    fontSize: 16,
                }}
            >
                {buttonTitle}
            </Text>
        </Pressable>
    )
}