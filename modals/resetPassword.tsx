import { useState } from "react";
import { View, Text, TextInput, Pressable, Modal, Keyboard } from "react-native";
import { resetPasswordProps } from "../types/ui";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";


export const ResetPassword = ({control, close}: resetPasswordProps): JSX.Element =>{

    const auth = getAuth();
    const [email, setEmail] = useState<string>('');

    return (

    <Modal
        visible={control}
        transparent={true}
        animationType="fade"
    >
    <Pressable
        style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
        }}
        onPress={close}
    >
        <Pressable
            onPress={//autodismiss textInput when pressing on the modal.
                ()=>Keyboard.dismiss()
            }
            style={{
                width: '80%',
                height: 200,
                padding: 20,
                borderRadius: 8,
                position: 'absolute',
                left: '10%',
                top: '40%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                backgroundColor: '#F3F3F3',
            }}
        >
            <Text>Send A Reset Password Email</Text>
            <TextInput
                placeholder="Enter email"
                placeholderTextColor={'black'}
                keyboardType="email-address"
                onChangeText={(text)=>setEmail(text)}
                value={email}
                style={{
                    padding: 5,
                    borderRadius: 8,
                    backgroundColor:'#EEE',
                    width: '70%',

                }}
            />
            <View style={{flexDirection: 'row', gap: 20}}>
                <Pressable
                    onPress={async ()=>{
                        close();//close the modal using higher level setter
                        try{
                            await sendPasswordResetEmail(auth, email);
                            console.log('sent verification password!');
                        }catch(error){
                            console.error(error);
                            close();
                        }
                }}
                >
                    <Text>Send Reset Password</Text>
                </Pressable>
                <Pressable
                    onPress={close}
                >
                    <Text>Cancel</Text>
                </Pressable>
            </View>
            
        </Pressable>
        </Pressable>
    </Modal>
    )
}