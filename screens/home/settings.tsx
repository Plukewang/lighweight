import { useState } from "react";
import { SettingProps } from "../../types/home/home";
import { View, Pressable, Text } from "react-native";
import {styles} from "../../theme/loginstyle"
import { Loading } from "../loading";
import { getAuth, signOut} from "firebase/auth";

export const Settings = ({navigation, route}:SettingProps) =>{

    const [loading, setLoading] = useState<boolean>(false);//loading activity tracker

    if(loading) return (
        <View style={styles.container}> 
          <Loading/>
        </View>
    
    )
    return(
        <View style={styles.container}>
            <Text>Hey</Text>
            <Pressable
                    onPress={async ()=>{
                        //navigate to login
                        const auth = getAuth();
                        setLoading(true);
                        await signOut(auth);
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '20%', 
                    }}
                >
                    
                    <Text>
                        Sign Out
                    </Text>
                </Pressable>
                <Pressable
                    onPress={async ()=>{
                        //navigate to login
                        const auth = getAuth();
                        setLoading(true);
                        await signOut(auth);
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '20%', 
                    }}
                >
                    
                    <Text>
                        Change Password
                    </Text>
                </Pressable>

        </View>
    )
}