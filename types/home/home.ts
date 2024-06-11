import { BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import { template } from '../../screens/home/cycle';


export type HomeScreenParams = {
    Base: undefined
    SettingStack: any
    Today: any
    Cycle: any
}

export type SettingParams = {
    Settings: any
    Personalize: any
    Legal: any
}



//for each tab
export type SettingStackProps = BottomTabScreenProps<HomeScreenParams, 'SettingStack'>

export type SettingProps = BottomTabScreenProps<SettingParams, 'Settings'>

export type TodayProps = BottomTabScreenProps<HomeScreenParams, 'Today'>

export type CycleProps = BottomTabScreenProps<HomeScreenParams, 'Cycle'>

//modals

export interface CreateCycleProps{
    template: template
    num: number
    control: boolean
    close: () => void
}