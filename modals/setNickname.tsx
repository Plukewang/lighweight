import React, { useEffect, useState } from "react";
import { Modal, Text, View, Pressable, Keyboard, Alert } from "react-native";
import { getAuth, sendEmailVerification, updateEmail, updateProfile } from "firebase/auth";
import { EditableInput } from "../theme/ui/editableInput";
import { MyText } from "../theme/ui/myText";
import { AreYouSure } from "./areYouSure";
import { UseAppStateStore } from "../src/globalAppState";
import { darkstyles } from "../theme/homestyle";

const auth = getAuth();
const user = auth.currentUser

export const SetProfile = (): JSX.Element =>{
    const [open, setOpen] = useState(false)
    const [nick, setNick] = useState('')
    const [mail, setMail] = useState('')

    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'

    useEffect(()=>{
        setNick(user?.displayName || '')
        setMail(user?.email || '')

    },[auth, user])

    return(
        <View style={{ width: '95%',
        height: '40%',
        margin: 30,
        padding: 15,
        borderRadius: 8,
        backgroundColor: currBackgroundColor,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        }}>
                <Modal
                    visible={open}
                    transparent={true}
                >
                    <Pressable
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        }}
                        onPress={()=>{Keyboard.dismiss()}}
                    >
                        <View
                            style={{
                                height: '80%',
                                width: '80%',
                                backgroundColor: theme ==='Light'? '#F3F3F3':'#282828',
                                position: 'absolute',
                                bottom: '10%',
                                left: '10%',
                                borderRadius: 16,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                                padding: 24,
                                gap: 20,
                            }}
                        >
                            
   
                

                
  
                            <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Display Name</MyText>
                            <EditableInput 
                                variable={nick}
                                inputMode="default" 
                                defaultItem={nick}
                                onChangeText={(text: string)=>{
                                    setNick(text)
                                }}
                            />
                            <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Email</MyText>

                            <Text style = {{color: currTextColor}}>{mail}</Text>
                            <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Verification Status</MyText>
                            <Text style = {{color: currTextColor}}>{auth.currentUser?.emailVerified? 'Verified':'Not Verified'}</Text>
                            <Pressable
                                    style={{
                                        alignSelf: 'flex-end',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 50,
                                        backgroundColor: currBackgroundColor,
                                        borderRadius: 8,    
                                    }}
                                    onPress={ async ()=>{
                                        try{
                                            if(user && !user.emailVerified){
                                                const result = await sendEmailVerification(user)
                                                Alert.alert('Email verification message sent!')
                                            }else if(user?.emailVerified){
                                                Alert.alert('Email already verified!')
                                            }
                                                
                                        }catch(error){
                                            throw(error)
                                        }
                                    }}
                                >
                                
                                <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Send Verification Email</MyText>
                                </Pressable>
                            <View
                                style={{
                                    alignSelf: 'flex-end',
                                    width: '100%',
                                    gap: 10,
                                    height: '40%',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                
                                <Pressable
                                    style={{
                                        alignSelf: 'flex-end',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 50,
                                        backgroundColor: currBackgroundColor,
                                        borderRadius: 8,    
                                    }}
                                >
                                    <AreYouSure
                                        warning="Save Changes?"
                                        action={async ()=>{
                                            setOpen(false)
                                            try{
                                                if(user) {
                                                    await updateProfile(user, {displayName: nick, })
                                                }
                                            }catch(error){
                                                throw(error)
                                            }
                                        }}
                                        
                                    >
                                            <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Save Changes</MyText>
                                        
                                    </AreYouSure>
                                </Pressable>
                                <Pressable 
                                    style={{
                                        alignSelf: 'flex-end',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 50,
                                        backgroundColor: currBackgroundColor,
                                        borderRadius: 8,    
                                        
                                    }}
                                    onPress={()=>setOpen(false)}
                                >
                                    <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Close</MyText>
                                </Pressable>
                            </View>

                           
                           
                        </View>
                        
                        
                    </Pressable>
                </Modal>

            <View style={{width: '100%', height: '100%', justifyContent: 'space-between', }}>
                <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Display Name</MyText>
                <Text style = {{color: currTextColor}}>{auth.currentUser?.displayName}</Text>
                <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Email</MyText>
                <Text style = {{color: currTextColor}}>{auth.currentUser?.email} </Text>
                <MyText size={16} highlight={theme==="Light"? true : 'white'} align="left">Verification Status</MyText>
                <Text style = {{color: currTextColor}}>{auth.currentUser?.emailVerified? "Verified" : "Unverified"}</Text>

                <Pressable
                    onPress={()=>{
                        setOpen(!open)
                    }}
                    style={{
                        alignSelf: 'flex-end',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        width: 100,
                        backgroundColor: theme==='Light'? '#F3F3F3': '#181818',
                        borderRadius: 8,
                    }}
                >
                    <Text style={{color: currTextColor}}>Edit Profile</Text>
                </Pressable>
            </View>
            
        </View>
        
    )
}