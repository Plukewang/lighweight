import { Dimensions, ScrollView, View } from "react-native";
import React, { useState, useRef } from "react";


interface swiperProps{
    children: JSX.Element[]
    defaultItem: number
}

export const PaginatedSwiper = ({children, defaultItem}:swiperProps): JSX.Element =>{
    const [active, setActive] = useState(defaultItem-1)//the index of the currently displayed item.
    const scrollRef = useRef<any>(null)

    const onMomentumScrollEnd = (e: any) => {
        const { nativeEvent } = e;
        const index = Math.round(nativeEvent.contentOffset.x / Dimensions.get('window').width);
        if (index !== active) setActive(index)
    }


    return(
        <ScrollView
            pagingEnabled
            horizontal
            nestedScrollEnabled
            onMomentumScrollEnd={onMomentumScrollEnd}
            ref={scrollRef}
            onLayout={()=>{
                scrollRef.current?.scrollTo({x: Dimensions.get('window').width*active})
            }}
        >
            {children.map((child: JSX.Element, index:number)=>{
                return <View 
                            style= {{
                                width: Dimensions.get('window').width,
                                height: '100%', 
                            }}
                            key = {index}
                        >
                            {child}
                        </View>
            })}
        </ScrollView>
    )
}