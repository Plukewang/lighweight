import { create } from "react-test-renderer";
import { Exercise } from "../types/ui";

export interface setInfo{
    weight: number
    reps: number
    intensity: number
}


export type Workset = {
    setList: setInfo[][]

}


export function createWorkSet(num: number, weeks: number): Workset{
    const setList: setInfo[][] = Array.from({ length: weeks }, () => Array(num? num: 4).fill(0));
    
    return ({
        setList,
    })
}

export const addSet = (exercise: Exerciseprog, set: setInfo, week: number)=>{
    exercise.setList.setList[week].push(set);//adds a set 
}
export const removeSet = (exercise: Exerciseprog, week: number, setIndex: number)=>{
    exercise.setList.setList[week].splice(setIndex,1);//removes a set.
}
export const updateSet = (exercise: Exerciseprog, week: number, set: setInfo, setIndex: number):Exerciseprog=>{
    exercise.setList.setList[week][setIndex] = set;
    return exercise;
}

/**
 * Type, Constructor and auxiliary methods for Exercise progression,
 */

export type Exerciseprog = {
    exercise: Exercise; //exercise object
    startingIntensity:  6 | 7 | 8 | 9 //intensity needs to start at least at 6, ideally 7-8
    startingWeight: number //starting weight in lbs (filthy American I am : 3) TODO: add kg and lb conversion.
    startingReps: number //starting rep count
    weightProgression: number //how much weight we can add
    repProgression: number
    repRange: {start: number, end:number}
    weightIncrement: number
    sets: number
    setType: 'Straight' | 'Myo' | 'Giant' | 'Drop'
    weeks: number
    currentWeek: number
    setList: Workset
}
export function Build(exercise: Exercise){//builder function for exercises for adding one.
    return ExerciseProg(
        exercise,
        7,
        0,
        5,
        0,
        0,
        {start: 5, end: 10},//rep range
        3,
        5,//weight increment
        4,//weeks
        ''//set type
    )
    //bog standard exercie progression start.
}
export function ProgressExerciseWeight(exercise: Exerciseprog, increment: number): Exerciseprog{//this adjsuts an excercisee to increment the weight by some amount.
    exercise.weightProgression += exercise.weightIncrement*increment;
    return exercise
}

export function ProgressExerciseReps(exercise: Exerciseprog, increment: number): Exerciseprog{
    exercise.repProgression = exercise.repProgression+increment > exercise.repRange.end ? 
        exercise.repRange.start 
        + 
        exercise.repProgression+increment%exercise.repRange.end //in case we go over the amount.
        :
        exercise.repProgression+increment;
    return exercise
}

export function ProgressExerciseWeek(exercise: Exerciseprog, increment: number): Exerciseprog{
    exercise.currentWeek+=1;
    return exercise
}


export function ExerciseProg(
    exercise1: Exercise,
    startingIntensity1: 6 | 7 | 8 | 9, 
    startingWeight1: number, 
    startingReps1:number, 
    weightProgression1: number, 
    repProgression1: number,
    repRange1: {start: number, end: number},
    startingSets: number,
    weightIncrement1: number,
    weeks1: number,
    setType1: 'Straight' | 'Myo' | 'Giant' | 'Drop' | ''){

    let exercise = exercise1
    let startingIntensity = startingIntensity1 ?? 7 //suggested starting intensity if not offered or custom set
    let startingWeight = startingWeight1
    let startingReps = startingReps1 ?? 5 //basic hypertrophy rep range
    let weightProgression = weightProgression1? weightProgression1 : 0
    let repProgression = repProgression1? repProgression1:0
    let repRange = repRange1
    let weightIncrement = weightIncrement1 || 5
    let sets = startingSets || 3
    let setType = setType1 != '' ? setType1 : 'Straight' //default are straight sets
    let weeks = weeks1 || 12 //start off on a 12:1 accumulation-deload progression scheme for a newbie
    let currentWeek = 0
    let setList = createWorkSet(sets, weeks)
   
    

    return ({
        exercise,
        startingIntensity,
        startingReps,
        startingWeight,
        weightProgression,
        repProgression,
        repRange,
        weightIncrement,
        sets,
        setType,
        weeks,
        currentWeek,
        setList
    })
}
/**
 *  Types, constructor, and auxiliary methods for the workout, which is a list of Exerciseprogs and an associated weekday.
 */
export type Workout = {
    exercises: Exerciseprog[]//a list of exercises.
    day: 'Mon'|'Tues'|'Wed'|'Thurs'|'Fri'|'Sat'|'Sun'
}

export type Volumes = {
    quads: number
    hamstrings: number
    glutes: number
    lats: number
    pecs: number
    frontDelt: number
    sideDelt: number
    rearDelt: number
    triceps: number
    biceps: number
    calves: number
    upperBack: number
    upperTraps: number
    forearms: number
    spinalErectors: number
    core: number
    hipAdductors: number
}

export function createVolumes():Volumes{
    return {
        quads: 0,
        hamstrings: 0,
        glutes: 0,
        lats: 0,
        pecs: 0,
        frontDelt: 0,
        sideDelt: 0,
        rearDelt: 0,
        triceps: 0,
        biceps: 0,
        calves: 0,
        upperBack: 0,
        upperTraps: 0,
        forearms: 0,
        spinalErectors: 0,
        core: 0,
        hipAdductors: 0}
}

function parseExerciseVolume(list: string[], vol: Volumes, sets: number):void{
    for(const item of list){
        if(item==='Quads'){
            vol.quads+=sets;
        }else if(item==='Hamstrings'){
            vol.hamstrings+=sets;
        }else if(item==='Glutes'){
            vol.glutes+=sets;
        }else if(item==='Lats'){
            vol.lats+=sets;
        }else if(item==='Pecs'){
            vol.pecs+=sets;
        }else if(item==='Front Delts'){
            vol.frontDelt+=sets;
        }else if(item==='Side Delts'){
            vol.sideDelt+=sets;
        }else if(item==='Rear Delts'){
            vol.rearDelt+=sets;
        }else if(item==='Triceps'){
            vol.triceps+=sets;
        }else if(item==='Biceps'){
            vol.biceps+=sets;
        }else if(item==='Calves'){
            vol.calves+=sets;
        }else if(item==='Upper Back'){
            vol.upperBack+=sets;
        }else if(item==='Upper Traps'){
            vol.upperTraps+=sets;
        }else if(item==='Forearms'){
            vol.forearms+=sets;
        }else if(item==='Spinal Erectors'){
            vol.spinalErectors+=sets;
        }else if(item==='Hip Adductors'){
            vol.hipAdductors+=sets;
        }else if(item==='Core'){
            vol.core+=sets;
        }

    }
}

export function WorkOut(exercisesList: Exerciseprog[], weekday: Workout['day']): Workout{
    let exercises = exercisesList? exercisesList: []
    let day = weekday 

    return({
        exercises,
        day
    })

}

export function BuildWorkout(day: Workout['day']): Workout{//creating a new workout object
    return WorkOut([], day);
}

export function AnalyzeWorkout(workout: Workout):Volumes{
    let vols: Volumes = createVolumes(); //make a default volume to start
    for(const exercise of workout.exercises){
        //loop thru exercise list and determine the volumes. 
        let primary =  exercise.exercise.data.primary
        let secondary =  exercise.exercise.data.secondary

        let sets = exercise.sets

        parseExerciseVolume(primary, vols, sets);
        parseExerciseVolume(secondary, vols, sets)
    }
    return vols
}

export function TotalSetsPerWorkout(vols: Volumes): number{
    let ans = 0;
    for(const [key,val] of Object.entries(vols)){
        ans+=val
    }
    return ans;
}

/**
 *  Types, constructor, and auxiliary methods for the entire training cycle, which is a list of basic attributes, a current week, and a seven-day breakdown of Workouts
 */
export type Trainingcycle = {
    name: string
    startDate: string
    weeks: number
    workoutScheme: Workout[]
    currentWeek: number
    totalsets: number
}

export function TrainingCycle(startDate1: string, weeks1:number, workoutScheme1: Workout[], name1: string, currentWeek1: number): Trainingcycle{
    let name = name1.length? name1 : 'Default Cycle'
    let startDate=startDate1
    let weeks=weeks1
    let workoutScheme=workoutScheme1 ? workoutScheme1 : Array(7).fill(WorkOut([], 'Mon'))//creates empty workout scheme if there are no provided workouts.
    let currentWeek = currentWeek1
    let totalsets = getTotalSets(workoutScheme);

    return({
        name,
        startDate,
        weeks,
        workoutScheme,
        currentWeek,
        totalsets
    })
    
}

export function BuildTrainingCycle(){
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];//this gets the YYYY-MM-DD from the ISO YYYY-MM-DDTHH:mm:ss.sssZ
    return TrainingCycle(currentDateString, 4, [], 'Default Cycle', 1);
}

export function getTotalSets(workouts: Workout[]): number{
    let ans = 0;
    for(const workout of workouts){
        for(const exercise of workout.exercises){
            ans+= exercise.sets
        }
    }
    return ans;
}
