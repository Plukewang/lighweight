import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingStackProps } from '../../types/home/home';
import { Settings } from './settings';
import { UseAppStateStore } from '../../src/globalAppState';
import { styles } from '../../theme/cyclestyle';
export const SettingStack = ({navigation, route}:SettingStackProps) =>{
    const SettingStack = createNativeStackNavigator();//stack navigator for setting tabs
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    return (
        <SettingStack.Navigator
            screenOptions={{headerShown: false}}
            >
            <SettingStack.Screen 
            name = 'Settings' component={Settings}
            options={{headerStyle: {backgroundColor: currBackgroundColor}, headerTitleStyle: {color: currTextColor} }}
            />
        </SettingStack.Navigator>
    )
}