import { useState } from 'react';
import { Screen1Props } from '../types/app';
import { View} from 'react-native';

import { Loading } from './loading';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import { Cycle } from './home/cycle';
import { Today } from './home/today';
import { styles } from '../theme/homestyle';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { SettingStack } from './home/settingStack';


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
                    name = 'Today' 
                    component={Today}
                    options={{
                        tabBarLabel: 'Today',
                        tabBarIcon: ()=>(<Ionicons name="today" size={24} color="black" />),
                        tabBarLabelStyle: {color: 'black'},
                        tabBarStyle:{
                            display: 'flex',
                            flexDirection: 'column'

                        }
                    }}/>
                    <Tab.Screen 
                    name = 'Cycle' 
                    component={Cycle}
                    options={{
                        tabBarLabel: 'Cycle',
                        tabBarIcon: ()=>(<Entypo name="bar-graph" size={24} color="black" />),
                        tabBarLabelStyle: {color: 'black'},
                        tabBarStyle:{
                            display: 'flex',
                            flexDirection: 'column'

                        }
                    }}/>
                    <Tab.Screen 
                    name = 'SettingStack' 
                    component={SettingStack}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ()=>(<Ionicons name="settings" size={24} color="black" />),
                        tabBarLabelStyle: {color: 'black'},
                        tabBarStyle:{
                            display: 'flex',
                            flexDirection: 'column'

                        }
                    }}/>
                    
                    
                </Tab.Navigator>
    )
}
