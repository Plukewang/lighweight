import { useState } from "react";
import { SettingProps } from "../../types/home/home";
import { View, Pressable, Text, Modal, TextInput, Alert } from "react-native";
import {styles, darkstyles} from "../../theme/homestyle"
import { Loading } from "../loading";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updatePassword} from "firebase/auth";
import { SetProfile } from "../../modals/setNickname";
import { SettingsButton } from "../../theme/ui/settingsbutton";
import { AreYouSure } from "../../modals/areYouSure";
import { errorHandler } from "../../src/authCredentialErrorHandler";

import { UseAppStateStore } from "../../src/globalAppState";
export const Settings = ({navigation, route}:SettingProps) =>{

    const [loading, setLoading] = useState<boolean>(false);//loading activity tracker
    const [passwordModalVisible, setpasswordModalVisible] = useState<boolean>(false); //password change modal dialog
    const [oldPassword, setOldPassword] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const auth = getAuth();
    const user = auth.currentUser;
    const offlineStatus = UseAppStateStore((state=>state.offline))
    const changeOfflineStatus = UseAppStateStore((state)=>state.changeOnlineStatus)
    const switchTheme = UseAppStateStore((state)=>state.switchTheme)
    const themeStatus = UseAppStateStore((state)=>state.theme)
    const currStyle = themeStatus ==='Dark'? darkstyles : styles 
    
    const changePassword = async () =>{
        //submission for changing a password
        try{
            if(user && user.email){
                const credential = EmailAuthProvider.credential(
                    user.email, 
                    oldPassword
                );
                console.log('true')
                const reAuth = await reauthenticateWithCredential(user, credential);//try to reauthenticate first
                if(reAuth){
                    if(password != confirmPassword){
                        //catch password mismatch
                        setPasswordError('Passwords do not match.');
                        Alert.alert('Passwords do not match.');
                        return;
                    }else{
                        if(user){//check if user is signed in still
                            try{
                                await updatePassword(user, password);
                                setpasswordModalVisible(false);
                                Alert.alert('Successfully changed password.');
                                setPassword('');
                                setConfirmPassword('');
                                setPasswordError('');
                            }catch(error: any){
                                setPasswordError(error.message);
                                Alert.alert(error.message);
                            }
                        }   
                    }
                }else Alert.alert('Not authorized')
            }
            
        }catch(error){
            Alert.alert(errorHandler(error))
            setOldPassword('')
            throw(error)
        }
        
    }
    if(loading) return (
        <View style={currStyle.container}> 
          <Loading/>
        </View>
     
    )
    return(
        <View style={ themeStatus ==='Light'? currStyle.account : currStyle.account}>

            <SetProfile />


            {/* Modal dialog for password change*/}
            <Modal animationType="fade" 
                visible={passwordModalVisible}
                transparent={true}
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    }}
                >
                <View style={currStyle.modal}>
                    <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>Enter Current Password</Text>
                    <TextInput
                        placeholder='...'    
                        secureTextEntry={true}
                        style = {currStyle.inputs}
                        onChangeText={(text) => { 
                            setOldPassword(text);
                          }}
                          value = {oldPassword}
                    />
                    {/* To input the new password*/}
                    <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>Enter New Password</Text>
                    <TextInput
                        placeholder='...'    
                        secureTextEntry={true}
                        style = {currStyle.inputs}
                        onChangeText={(text) => { 
                            setPassword(text);
                          }}
                          value = {password}
                    />
                    {/* To input the confirmation*/}
                    <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>Confirm New Password</Text>
                    <TextInput
                        placeholder='...'    
                        secureTextEntry={true}
                        style = {currStyle.inputs}
                        onChangeText={(text) => { 
                            setConfirmPassword(text);
                          }}
                          value = {confirmPassword}
                    />
                    <Text
                    style={{
                        color: '#6B0000',
                    }}
                    >
                        {passwordError}
                    </Text>
                    {/* this tests for errors and then passes it to firebase to update the new password*/}
                    <Pressable
                            style={currStyle.modalButton}
                        >
                    <AreYouSure
                        warning="Change password?"
                        action={()=>{

                            changePassword()
                        }}
                    >
                        
                        <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>Update Password</Text>
                        
                    </AreYouSure>
                    </Pressable>
                    {/*close the modal */}
                    <Pressable
                        onPress={()=>{
                            setPassword('');
                            setConfirmPassword('');
                            setPasswordError('');
                            setpasswordModalVisible(false)
                            setOldPassword('')
                        }}
                        style={currStyle.modalButton}
                    >
                        <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>Close</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            {/* The tabs for navigation */}
            <View style={currStyle.settingsTabs}>

                <SettingsButton press = {//TODO: Add this page
                    ():void => {
                        switchTheme()
                    } 
                }
                buttonTitle = {themeStatus==='Light'? 'Dark Mode':'Light Mode'}/>

                <SettingsButton press = {//TODO: Add this page
                    ():void => {
                        changeOfflineStatus()
                    } 
                }
                buttonTitle = {offlineStatus?  'Go online': 'Go offline'}/>

                
                {/*
                    Sign out button. TODO: Investigate loading potential.
                */}

                <SettingsButton 
                    buttonTitle="Change Password"
                    press = {async ()=>{
                        setpasswordModalVisible(true);
                    }}
                />

                <SettingsButton 
                    buttonTitle="Sign Out"
                    important
                    press={async ()=>{
                        //navigate to login
                        const auth = getAuth();
                        setLoading(true);
                        await signOut(auth);
                        setLoading(false);
                    }}
                />
            </View>
        </View>
    )
}