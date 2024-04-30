import { useState } from 'react';
import { Screen1Props } from '../types/app';
import { StyleSheet, Text, Pressable, ScrollView, View} from 'react-native';

import { getAuth, signOut } from "firebase/auth";
import { Loading } from './loading';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Settings } from './home/settings';
import { styles } from '../theme/homestyle';

export const Home = ({navigation, route}:Screen1Props) =>{
    const Tab = createBottomTabNavigator();

    const [loading, setLoading] = useState<boolean>(false);//loading activity tracker

    if(loading) return (
        <View style={styles.container}> 
          <Loading/>
        </View>
      )

    return(
        <Tab.Navigator 
                initialRouteName='Settings'
                sceneContainerStyle={styles.tab}
                screenOptions={{
                    headerShown: false,
                }}
                >
                    <Tab.Screen 
                    name = 'Settings' 
                    component={Settings}
                    options={{
                        tabBarLabel: 'Settings',
                    }}/>
                </Tab.Navigator>
    )
}
