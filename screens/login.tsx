import { useState } from 'react';
import { LoginProps } from '../types/app';
import {  View, TouchableHighlight, Image, TextInput, Text, Alert} from 'react-native';
import { styles } from '../theme/loginstyle';
import { MyText } from '../theme/myText';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { app } from '../src/firebase.config';

import { auth } from '../src/firebase.config';


export const Login = ({navigation, route}:LoginProps) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            }
            setError('Sign in error. Try again.');
            console.error(error)
            Alert.alert(error);
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
                onChangeText={(text) => { 
                    setEmail(text);
                  }}
                  value = {email}
            />

            <TextInput
                placeholder='Password'
                style = {styles.inputs}
                onChangeText={(text) => { 
                    setPassword(text);
                  }}
                  value = {password}
            />


            <TouchableHighlight
                onPress={()=>{
                //navigate to login
                    onLoginPress({email,password});
                }}
                style={
                    styles.login
                }
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
                <Text>Already have an account? <Text style={{color: 'blue'}}>Sign Up Here</Text></Text>
            </TouchableHighlight>

        </View>
        </KeyboardAwareScrollView>
    )
}

