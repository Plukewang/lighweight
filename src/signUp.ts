import { createUserWithEmailAndPassword, prodErrorMap, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase.config";
import { Alert } from "react-native";

//functions here to handle signup process

export async function SignUp(email: string, password: string){
    try{
        const userCredentials = createUserWithEmailAndPassword(auth, email, password);
        const user = (await userCredentials).user;


        console.log('registered' +user);
        return user;
    }catch(error){
        throw error;
    }
}

export async function verify(){
    const user = auth.currentUser;
    try{
        if(auth.currentUser){
            await sendEmailVerification(auth.currentUser,{
            handleCodeInApp: true,
            url: 'lightweight-7b33f.web.app',
            iOS: {
                bundleId: 'com.lightweight',
              },
            
        }).then(()=>{   
            //success
            if(user) console.log('successfully verified '+ user.email);
        });
        }
    }catch(error){
        //error handler
        Alert.alert('Email verification error:'+error);
    }
}