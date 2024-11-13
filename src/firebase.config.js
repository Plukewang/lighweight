import * as firebase from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIKEY} from "@env"



const testconfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
}



export const app = firebase.initializeApp(testconfig)
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage),
})
export const db = getFirestore(app)





