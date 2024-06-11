import { StackScreenProps } from '@react-navigation/stack'
import { Auth } from 'firebase/auth';
import { Trainingcycle } from '../src/exercises';
//navigation types
export type RootParams = {
    Home: any,
    Login: undefined,
    Register: undefined,
    Screen3: {paramB: string; paramC: number}
}

export type Screen1Props = StackScreenProps<RootParams, 'Home'>

export type LoginProps = StackScreenProps<RootParams, 'Login'>

export type RegisterProps = StackScreenProps<RootParams, 'Register'>

export type UserInfo = {
    name: string
}