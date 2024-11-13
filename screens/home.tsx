import { useState } from 'react';
import { Screen1Props } from '../types/app';
import { View} from 'react-native';

import { Loading } from './loading';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import { Cycle } from './home/cycle';
import { Today } from './home/today';
import { styles, darkstyles } from '../theme/homestyle';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { UseAppStateStore } from '../src/globalAppState';
import { SettingStack } from './home/settingStack';


export const Home = ({navigation, route}:Screen1Props) =>{
    const Tab = createBottomTabNavigator();
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const [loading, setLoading] = useState<boolean>(false);//loading activity tracker
    const currTheme = theme=== 'Light'? styles : darkstyles
    if(loading) return (
        <View style={styles.container}> 
          <Loading/>
        </View>
      )

    return(
        <Tab.Navigator 
                initialRouteName='Settings'
                sceneContainerStyle={currTheme.tab}
                screenOptions={{
                    headerShown: false,
                }}
                >
                    <Tab.Screen 
                    name = 'Today' 
                    component={Today}
                    options={{
                        tabBarLabel: 'Today',
                        tabBarIcon: ()=>(<Ionicons name="today" size={24} color={currTextColor} />),
                        tabBarLabelStyle: {color:currTextColor},
                        tabBarStyle:{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: currBackgroundColor
                        }
                    }}/>
                    <Tab.Screen 
                    name = 'Cycle' 
                    component={Cycle}
                    options={{
                        tabBarLabel: 'Cycle',
                        tabBarIcon: ()=>(<Entypo name="bar-graph" size={24} color={currTextColor} />),
                        tabBarLabelStyle: {color:currTextColor},
                        tabBarStyle:{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: currBackgroundColor

                        }
                    }}/>
                    <Tab.Screen 
                    name = 'SettingStack' 
                    component={SettingStack}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ()=>(<Ionicons name="settings" size={24} color={currTextColor} />),
                        tabBarLabelStyle: {color: currTextColor},
                        tabBarStyle:{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: currBackgroundColor
                        }
                    }}/>
                    
                    
                </Tab.Navigator>
    )
}
