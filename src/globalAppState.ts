import { create } from "zustand";

type GlobalSettingsState = {
    offline: boolean //check if we need to read from async storage.
    theme: 'Light' | 'Dark' //check for light/dark mode
    units: 'kg' | 'lb' //check for metric or imperial units 
}

type GlobalSettingsAction={
    changeOnlineStatus:()=>void
    switchTheme: ()=>void
    switchUnits: ()=>void
}

export const UseAppStateStore = create<GlobalSettingsState & GlobalSettingsAction>()((set)=>({
    offline: true,
    theme: 'Light',
    units: 'lb',
    changeOnlineStatus: ()=>set((state)=>({offline: !state.offline})),
    switchTheme: ()=>set((state)=>({theme: state.theme === 'Light'? 'Dark': 'Light'})),
    switchUnits: ()=>set((state)=>({units: state.units === 'lb'? 'kg': 'lb'})),
}))