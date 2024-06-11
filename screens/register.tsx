import { RegisterProps } from '../types/app';
import { TextInput, TouchableHighlight, Text, View, Image, Alert } from 'react-native';
import { styles } from '../theme/loginstyle';
import { MyText } from '../theme/ui/myText';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//for auth
import {SignUp, verify }from '../src/signUp';

export const Register = ({navigation, route}:RegisterProps) =>{
    //interface for setting email and password states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

      //navigation processing
      const comparePassword = async ()=>{
        console.log(password, confirm, email)
        //catch mismatched passwords
        if(password !== confirm && password.length!=0){
            Alert.alert('Error', 'Passwords do not match');
            setConfirm('');
            setError('Error, Passwords do not match');
            return;
        } 
        //catch empty email field
        if(email.length==0){
            Alert.alert('Error', 'You must enter an email address');
            setError('You must enter an email address');
            return;
        }
        try{
            //try to sign up the user. Must verify email
            const user = await SignUp(email,password);
            if(user){
                const id = user.uid;
                navigation.push('Home',{user});
            }

        }catch(error: any){
            //catch remaining errors
            switch(error.code){
                case 'auth/email-already-in-use':
                    setError('This email is already in use');
                    break;
                case 'auth/weak-password':
                    setError('Weak password. Please use a password with at least six characters.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email. Try again.');
                    break;
                default:
                    setError('Error signing up. Try again.')
            }
            
        }
      }

      return (<KeyboardAwareScrollView contentContainerStyle={styles.container}>

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
              Register
      </MyText>
    <TextInput
          placeholder='Email'    
          style = {styles.inputs}
          keyboardType='email-address'
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
      />

    <TextInput
          placeholder='Confirm Password'    
          style = {styles.inputs}
          onChangeText={(text) => {
                setConfirm(text);
          }}
      />


      <TouchableHighlight
          onPress={()=>{
          //navigate to login
              comparePassword();
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
              Create Account
          </Text>
      </TouchableHighlight>
        
      <Text
        
        style={{
            color: 'red',
        }}
        >
            {/* error display message */}
                {error}
        </Text>

      <TouchableHighlight
        onPress={()=>{
            navigation.navigate('Login');
        }}
        underlayColor={'#767673'}
        style={{borderRadius:8}}
      >
        <Text>Already have an account? <Text style={{color: 'blue'}}>Log In Here</Text></Text>
      </TouchableHighlight>
      
  </KeyboardAwareScrollView>
)
}
