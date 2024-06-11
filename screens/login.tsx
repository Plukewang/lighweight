import { useState, useRef } from 'react';
import { LoginProps } from '../types/app';
import {  View, TouchableHighlight, Image, TextInput, Text, Alert} from 'react-native';
import { styles } from '../theme/loginstyle';
import { MyText } from '../theme/ui/myText';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { app } from '../src/firebase.config';

import { auth } from '../src/firebase.config';
import { ResetPassword } from '../modals/resetPassword';

export const Login = ({navigation, route}:LoginProps) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //password reset controller
    const [resetPassword, setResetPassword] = useState<boolean>(false);

    //autofocus login button on web
    const loginRef = useRef<TouchableHighlight>(null);
    const passwordRef = useRef<TextInput>(null);

    interface userProps{
        email:string
        password: string
    }


    const onLoginPress = async ({email, password}: userProps)=>{
        try{//sign in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if(user){
                console.log('signed in'+user.email);
                navigation.push('Home');
            }
            
        }catch(error:any){
            //error handling
            switch(error.code){
                case 'auth/user-not-found':
                    setError('Username or password not found. Try again.');
                    break;
                case 'auth/wrong-password':
                    setError('Username or password not found. Try again.');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many login attempts. Try again later.');
                    break;
                default: 
                    setError('Sign in error. Try again.');
                    break;
            }
            console.error(error)
            Alert.alert(error);
            navigation.navigate('Login');
        }
    }

    return(
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>

            <View style={styles.title}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={styles.logo}
                    />
                <MyText 
                    size={40}
                    highlight={false}
                    align='center'
                >
                    LIGHTWEIGHT
                </MyText>
            </View>

            <MyText 
                    size={20} 
                    highlight={true}
                    align='center'
                >
                    Login
            </MyText>

            <TextInput
                placeholder='Email'    
                style = {styles.inputs}
                keyboardType='email-address'
                onChangeText={(text) => { 
                    setEmail(text);
                  }}
                  value = {email}
                  onSubmitEditing={()=>{
                    passwordRef.current && passwordRef.current.focus();
                }}
            />

            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                style = {styles.inputs}
                onChangeText={(text) => { 
                    setPassword(text);
                  }}
                value = {password}
                ref = {passwordRef}
                onSubmitEditing={()=>{
                    loginRef.current && loginRef.current.focus();
                }}
            />


            <TouchableHighlight
                onPress={()=>{
                //navigate to login
                    onLoginPress({email,password});
                }}
                style={
                    styles.login
                }
                ref={loginRef}
                >
                
                <Text
                    style={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'Koulen-Regular',
                }}
                >
                    Log In
                </Text>
            </TouchableHighlight>
            
            <Text
                style={{
                    color: 'red',
                }}
            >
                {error}
            </Text>

            <TouchableHighlight
                onPress={()=>{
                    navigation.navigate('Register');
                }}
                underlayColor={'#767673'}
                style={{borderRadius:8}}
            >
                <Text>Don't have an account? <Text style={{color: 'blue'}}>Sign Up Here</Text></Text>
            </TouchableHighlight>

            <ResetPassword
                control={resetPassword}
                close={()=>setResetPassword(false)}
            />

            <TouchableHighlight
                onPress={
                    //opens the reset password modal
                    ()=>setResetPassword(true)
                }
                underlayColor={'#767673'}
                style={{borderRadius:8}}
            >
                <Text style={{color: 'blue'}}>Forgot Password?</Text>
            </TouchableHighlight>

        </View>
        </KeyboardAwareScrollView>
    )
}

