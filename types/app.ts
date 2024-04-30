import { StackScreenProps } from '@react-navigation/stack'
import { Auth } from 'firebase/auth';
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


//text types
