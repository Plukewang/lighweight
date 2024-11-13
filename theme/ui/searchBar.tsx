import { useState, useRef } from "react";
import { Pressable, TextInput, View, ScrollView, Text, StyleSheet, Keyboard } from "react-native";
import { searchBarProps } from "../../types/ui";
import { Exercise } from "../../types/ui";
import Fuse from "fuse.js";
import { FuseResult } from "fuse.js";
import { UseAppStateStore } from "../../src/globalAppState";

export const SearchBar=({list, action}:searchBarProps):JSX.Element=>{
    const [theme, switchTheme] = [UseAppStateStore((state)=>state.theme), UseAppStateStore((state)=>state.switchTheme)]
    const currBackgroundColor = theme === 'Light'? 'white' : '#282828'
    const currTextColor = theme === 'Light'? 'black' : '#F3F3F3'
    const currTheme = theme=== 'Light'? styles : darkstyles

    const [showSearch, setShowSearch] = useState(false);//while this is false, do not show the search results. Off by default until input is clicked.
    const [searchPhrase, setSearchPhrase] = useState<string>('');//search phrase state and setter
    const [searchResults, setSearchResults] = useState<Array<FuseResult<Exercise>>>([]);

    const searchRef = useRef<TextInput>(null);

    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "name",
            "data.primary",
            "data.type",
        ]
    };
    const fuse = new Fuse<Exercise>(list, fuseOptions);

    return(
    <View
        style={currTheme.container}
          
    >
        <Pressable
            style={currTheme.subcontainer}
            onPress={():void=>{
                setSearchResults([]);
                Keyboard.dismiss();
            }}  
        >
            <Pressable
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
                onPress={()=>{
                    searchRef.current?.focus();
                }}
            >
                <TextInput
                    onChangeText={(text)=>{
                        setSearchPhrase(text);
                        const result = fuse.search(text)//searches for the match
                        setSearchResults(result);
                    }}
                    style={currTheme.searchbar}
                    value={searchPhrase}
                    placeholder="Search an exercise..."
                    placeholderTextColor={currTextColor}
                    autoFocus
                    ref = {searchRef}
                />
            </Pressable>
            
        <ScrollView style={currTheme.searchResults}>
                {   searchResults.length? 
                    searchResults.map((fuseResult, i)=>{
                        return (
                        <Pressable
                            key={i}
                            style={styles.searchResultItem}
                            onPress={()=>{
                                action(fuseResult.item)
                            }}
                        >   
                            
                                <Text
                                    style={{color: currTextColor}}
                                >   
                                    {fuseResult.item.name} 
                                </Text>
                                
                            
                        </Pressable>)
                    }) 
                    :
                    list.map((exercise, i)=>{
                        return (
                            <Pressable
                                key={i}
                                style={currTheme.searchResultItem}
                                onPress={()=>{
                                    action(exercise)
                                }}
                            >
                                    <Text
                                        style={{color: currTextColor}}
                                    >   
                                        {exercise.name} 
                                    </Text>
                                
                            </Pressable>)
                    })
                }
            </ScrollView>
        </Pressable>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    subcontainer:{
        width: '90%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    searchbar: {
        borderColor: '#F3F3F3',
        borderRadius: 8,
        borderWidth: 1,
        width: '100%',
        height: 40,
        margin: 10,
        flexShrink: 0,
    },
    searchResults: {
        height: 200,
        width: '100%',
        overflow: 'hidden'
    },
    searchResultItem:{
        borderWidth: 1,
        borderColor: '#F3F3F3',
        borderRadius: 8,
        height: 40,
        width: '100%',
        margin: 2,
        padding: 5,
        flexDirection: 'row',
    }
})

const darkstyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#181818',
    },
    subcontainer:{
        width: '90%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    searchbar: {
        borderColor: '#121212',
        borderRadius: 8,
        borderWidth: 1,
        width: '100%',
        height: 40,
        margin: 10,
        flexShrink: 0,
        backgroundColor: '#404040',
    },
    searchResults: {
        height: 200,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#181818',
    },
    searchResultItem:{
        backgroundColor: '#282828',
        borderWidth: 1,
        borderColor: '#121212',
        borderRadius: 8,
        height: 40,
        width: '100%',
        margin: 2,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }
})