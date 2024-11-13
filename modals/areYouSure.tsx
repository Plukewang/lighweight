import React, { useState } from "react";
import { Modal, Text, View, Pressable } from "react-native";
import { areYouSureProps } from "../types/ui";

export const AreYouSure = ({warning, action, children, exception}: areYouSureProps): React.ReactNode=>{
    const [open, setOpen] = useState(false)
    return (
    <View style={{width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
    >
        <Pressable 
            style={{width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
            onPress={()=>{
                if(exception){
                    if(exception()) setOpen(true)
                }else setOpen(true)
            }}
        >
            {children}
        </Pressable>

        <Modal
            visible={open}
            transparent={true}
        >   
            <Pressable
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
                onPress={()=>setOpen(false)}
            >
                <View
                style={{
                    position: 'absolute',
                    width: 200,
                    height: 100,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 8,
                    padding: 8,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10
                }}
                >
                    <Text style={{textAlign: 'center'}}>{warning}</Text>

                    <View style={{
                        flexDirection: 'row', 
                        gap: 20,
                        }}
                    >
                        <Pressable
                            onPress={()=>{
                                action();
                                setOpen(false);
                            }}
                            style={{
                                padding: 10,
                            }}
                        >
                            <Text>Confirm</Text>
                        </Pressable>

                        <Pressable
                            onPress={()=>setOpen(false)}
                            style={{
                                padding: 10,
                            }}
                        >
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
            
        </Modal>
    </View>)   
}