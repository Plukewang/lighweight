import { BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type HomeScreenParams = {
    Base: undefined
    Settings: any
}

//for settings
export type SettingProps = BottomTabScreenProps<HomeScreenParams, 'Settings'>