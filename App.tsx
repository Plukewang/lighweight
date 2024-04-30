import { useState, useCallback, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//screens
import { Home } from './screens/home';
import { Login } from './screens/login';
import { Register } from './screens/register';
import { Loading } from './screens/loading';
//types
import {RootParams} from './types/app';

import { getAuth, User, onAuthStateChanged } from 'firebase/auth';


export default function App() {

  const [user, setUser] = useState<User | null>(null);//check for authentication.
  const [loading, setLoading] = useState<boolean>(true);//loading activity tracker
  const auth = getAuth();
  //observer for auth state change
  onAuthStateChanged(auth, (User)=>{
    //check if user is null
    if(User){
      //signed in
      setUser(User);
      const uid = User.uid;

    }else{
      //user is signed out or does not exist
      setUser(null);
    }
    if(loading) setLoading(false)
  });
  

  const Root = createStackNavigator<RootParams>()//root navigator stack

  const [fontsLoaded, fontError] = useFonts({
    'Koulen-Regular': require('./assets/fonts/Koulen-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  //loading
  if(loading) return (
    <View style={styles.container}> 
      <Loading/>
    </View>
  )

  return (
    <SafeAreaProvider >
      <NavigationContainer >

      <Root.Navigator screenOptions={{headerShown: false}}>
          { (user ? 
            (<Root.Screen name="Home" component={Home} /> )
            : 
          ( <> 
            <Root.Screen name="Login" component={Login} />
            <Root.Screen name="Register" component={Register} />
            </>
          ))}
          
          
      </Root.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
