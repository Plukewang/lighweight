import React from "react";
import { Text } from "react-native";


import { textProps } from "../types/text";

export const MyText = ({children, size, highlight, align}: textProps)=> {

    

    return (
        <Text style={{
            fontSize: size,
            fontFamily: 'Koulen-Regular',
            color: highlight == true? '#ECC640':'black',
            textAlign: align,
        }}>{children}</Text>
    );
  };