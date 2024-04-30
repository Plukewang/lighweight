import * as firebase from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: ' AIzaSyBp7ZbR0jfYB_VmN6J5yachxha5N9IYqkw',
  authDomain: 'localhost',
  databaseURL: 'https://lightweight-7b33f-default-rtdb.firebaseio.com/',
  projectId: 'lightweight-7b33f',
  storageBucket: 'gs://lightweight-7b33f.appspot.com',
  messagingSenderId: '211262033344',
  appId: '1:211262033344:ios:e891517dab2cc4db374c25',
};

export const app = firebase.initializeApp(firebaseConfig)
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage),
})
export const firestore = getFirestore(app)





