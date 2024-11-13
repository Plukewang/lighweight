import React from "react";
import { Text } from "react-native";


import { textProps } from "../../types/text";

export const MyText = ({children, size, highlight, align}: textProps)=> {

    const highlightColor = highlight === 'white' ? 'white' : (highlight===true? '#ECC640':'black' )

    return (
        <Text style={{
            fontSize: size,
            fontFamily: 'Koulen-Regular',
            color: highlightColor,
            textAlign: align,
        }}>{children}</Text>
    );
  };