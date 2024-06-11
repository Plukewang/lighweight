import { useState, useRef } from "react";
import { Pressable, TextInput, View, ScrollView, Text, StyleSheet, Keyboard } from "react-native";
import { searchBarProps } from "../../types/ui";
import { Exercise } from "../../types/ui";
import Fuse from "fuse.js";
import { FuseResult } from "fuse.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const SearchBar=({list, action}:searchBarProps):JSX.Element=>{

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
        ]
    };
    const fuse = new Fuse<Exercise>(list, fuseOptions);

    return(
    <View
        style={styles.container}
          
    >
        <Pressable
            style={styles.subcontainer}
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
                        const result = fuse.search(searchPhrase)//searches for the match
                        setSearchResults(result);
                    }}
                    style={styles.searchbar}
                    value={searchPhrase}
                    placeholder="Search an exercise..."
                    placeholderTextColor='#000'
                    autoFocus
                    ref = {searchRef}
                />
            </Pressable>
            
        <ScrollView style={styles.searchResults}>
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
                                style={styles.searchResultItem}
                                onPress={()=>{
                                    action(exercise)
                                }}
                            >
                                <Text
                                    
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
        margin: 2,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }
})