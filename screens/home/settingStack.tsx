import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingStackProps } from '../../types/home/home';
import { Settings } from './settings';

export const SettingStack = ({navigation, route}:SettingStackProps) =>{
    const SettingStack = createNativeStackNavigator();//stack navigator for setting tabs
    return (
        <SettingStack.Navigator
            screenOptions={{headerShown: true}}>
            <SettingStack.Screen name = 'Settings' component={Settings}/>
        </SettingStack.Navigator>
    )
}