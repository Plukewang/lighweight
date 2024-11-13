import { CycleState, CycleAction, CycleListAction, CycleListState } from "../types/ui"
import { create } from "zustand"
import { Workout, Exerciseprog, TrainingCycle, Trainingcycle, BuildWorkout, getTotalSets } from "./exercises";
import { getTrainingCycle, saveTrainingCycle } from "./asyncLayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { State } from "react-native-gesture-handler";

const date = new Date();
const dateString = date.toISOString().split('T')[0];



export const useCycleStore = create<CycleState & CycleAction>()((set)=>({
    name: 'Training Cycle ' + dateString,
    startDate: dateString,
    weeks: 4,
    workoutScheme: [],
    totalSets: 0,
    progress: 0,
    updateProgress: ()=>set((state)=>({progress: state.progress+1})),
    resetProgress: ()=>set(()=>({progress: 0})) ,
    /**
     * Update basic identification information for the training cycle
     * 
     */
    updateCycleName: (cycleName)=>set(()=>({name: cycleName})), //set cycle name
    updateCycleStartingDate: (startDate)=>set(()=>({startDate: startDate})), //set cycle start date as a string
    updateCycleWeeks: (weeks)=>set(()=>({weeks: weeks})), //set number of weeks

    /*
     * Add and remove for the workout cycle itself. 
     * Use case: User wants to add a new session or remove a session they don't want anymore.
     */
    addCycleSession: (day: Workout['day'])=>set((state)=>({ //add a session to the current workout cycle. Requires previous state to add.
        workoutScheme: [
            ...state.workoutScheme, //add to existing cycle.
            BuildWorkout(day), //calls the builder function to create a new workout object with no exercises.
        ]
    })),
    removeCycleSession: (day)=>set((state)=>({
        workoutScheme: state.workoutScheme.filter((workout)=>workout.day!=day)
    })),//when updatingm just set the session to the session.
    addSessionExercise: (exercise:Exerciseprog, day: Workout['day'])=>set((state)=>({
        workoutScheme: state.workoutScheme.map((workout: Workout)=>{ //find the corresponding day and add the exercise to it.
            if(workout.day==day){
                let updatedWorkout = workout;
                updatedWorkout.exercises = [...workout.exercises, exercise];
                return updatedWorkout
            }else return workout
        }),
        totalSets: getTotalSets(state.workoutScheme)
    })),
    removeSessionExercise: (name: string, day: Workout['day']) => set((state)=>({
        workoutScheme: state.workoutScheme.map((workout: Workout)=>{ //find the corresponding day and add the exercise to it.
            if(workout.day==day){
                let updatedWorkout = workout;
                updatedWorkout.exercises = workout.exercises.filter((Exerciseprog: Exerciseprog)=>Exerciseprog.exercise.name !== name) //remove any exercise matching that specific name.
                return updatedWorkout
            }else return workout 
        }),
        totalSets: getTotalSets(state.workoutScheme)
    })),
    updateSessionExercise: (exercise: Exerciseprog, day: Workout['day'], id) => set((state)=>({
        workoutScheme: state.workoutScheme.map((workout: Workout)=>{ //find the corresponding day and add the exercise to it.
           
            if(workout.day==day){
                let updatedWorkout = workout;
                updatedWorkout.exercises = workout.exercises.map((exerciseItem: Exerciseprog, i: number)=>{
                    if(i===id){
                        return exercise //update the item that matches its id. 
                    }else return exerciseItem //if its not the updated one we just return the original item
                })
                return updatedWorkout
            }else return workout 
        }),
        totalSets: getTotalSets(state.workoutScheme)
    })),
    loadCycle: (cycle: Trainingcycle) => set((state)=>({
        name: cycle.name,
        startDate: cycle.startDate,
        weeks: cycle.weeks,
        workoutScheme: cycle.workoutScheme,
        totalsets: cycle.totalsets,
        progress: 0,
    })),
    clearCycle: ()=> set((state)=>({
        name: 'Default Cycle',
        startDate: dateString,
        weeks: 4,
        workoutScheme: [],
    })),
}))

export const useCycleListStore = create<CycleListState & CycleListAction>()((set)=>({
    cycles: [],
    active: 0,
    changeActive:(num: number)=>set((state)=>({

        cycles: [state.cycles[num], ...state.cycles.filter((x,i)=>i!==num)],
        active: num,
    })),
    updateCycleName: (newName: Trainingcycle['name'], key: number) => set((state)=>({//update a name in reference and in place
        cycles: state.cycles.map((cycle,i:number)=>{
            if(i===key) return newName
            else return cycle
        })
    })),
    addCycleName: (name: Trainingcycle['name']) => set((state)=>({//add a new reference.
        cycles:[...state.cycles, name]
    })),
    removeCycleName: (name: Trainingcycle['name']) => set((state)=>({
        cycles: state.cycles.filter(cycle=>cycle!==name)
    })),
    syncCycleList: (list: string[])=> set(()=>({
        cycles: list
    }))

}))