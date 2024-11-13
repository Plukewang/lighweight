import React from "react"

export interface textProps{
    children: React.ReactNode
    size: number
    highlight: true | false | 'white'
    align: 'center' | 'justify' | 'left' | 'right'
}

export interface editableProps{
    variable: string
    onChangeText: (text:string) => void
    defaultItem: string
    inputMode: 
    'default' |
    'number-pad'|
    'decimal-pad'|
    'numeric'|
    'email-address'|
    'phone-pad'|
    'url'

}
