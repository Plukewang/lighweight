import {  Workout, ExerciseProg, Exerciseprog, Trainingcycle } from "../src/exercises"

export interface resetPasswordProps{
    control: boolean
    close: () =>void
}

export interface areYouSureProps{
    warning: string,
    action: ()=>void
    children: JSX.Element
}

export interface addSessionprops{
    weekday: Workout['day']
}

export type Exercise = {
    name: string
    data: {
        primary: Array<string>
        secondary: Array<string>
        type: string
    }
}

export interface searchBarProps{
    list: Array<Exercise>
    action: (exercise: Exercise)=>void
}

export interface editCycleProps{
    name: string
    update: ()=> void
    num: number
}

export interface editExerciseProps{
    editedExercise: Exerciseprog
    day: Workout['day']
    id: number
}

export interface cycleStatsProps{
    cycle: Trainingcycle
}
//for the cycle store for zustand


export type CycleState={
    name: string
    startDate: string
    weeks: number
    workoutScheme: Workout[]
    totalSets: number
}

export type CycleAction={
    updateCycleName:(name: CycleState['name'])=>void
    updateCycleStartingDate:(startDate: CycleState['startDate'])=>void
    updateCycleWeeks:(weeks: CycleState['weeks'])=>void
    addCycleSession: (day:Workout['day'])=>void
    removeCycleSession: (day: Workout['day'])=>void 
    addSessionExercise: (exercise:Exerciseprog, day: Workout['day'])=>void
    removeSessionExercise: (name: string, day: Workout['day'])=>void//remove via exercise name
    updateSessionExercise: (exercise: Exerciseprog, day: Workout['day'],id: number)=>void //replace the exercise entirely.
    loadCycle: (cycle: Trainingcycle) =>void
    clearCycle: ()=>void

}

//for the training cycle list store in zustand

export type CycleListState = {
    cycles: string[]
    active: number
}

export type CycleListAction={
    changeActive: (num: number)=>void
    updateCycleName: (newName: Trainingcycle['name'], key: number)=>void
    addCycleName: (name: Trainingcycle['name'])=>void
    removeCycleName: (name: Trainingcycle['name'])=>void
}