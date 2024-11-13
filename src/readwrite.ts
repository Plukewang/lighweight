import { doc, setDoc, updateDoc, getDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { User, getAuth } from "firebase/auth";
import { ExerciseProg, Exerciseprog, TrainingCycle, Trainingcycle, WorkOut, Workout } from "./exercises";
import { db } from "./firebase.config";
import { UserInfo } from "../types/app";

const auth = getAuth()
const userEmail = auth.currentUser?.email;

interface convertedCycle{
    name: string
    startDate: string
    weeks: number
}
export async function createUserTrainingCycle(user: User){
    if(!auth.currentUser && user.email){  
        const newEmail: string = user.email;

        const document = doc(db, 'users', newEmail);

        const newUserInfo: UserInfo = {name: ''}
        try{
            const result = await setDoc(document, newUserInfo)//create a new doc at users level with email of registering user with an existing training cycles list.
            return "success"
        }catch(error){
            throw(error)
        }
    }else{
        return "already logged in."
    }
}

export async function addUserCycle(cycle: Trainingcycle){//take a training cycle and save it to the user's collection called 'trainingcycles'
    if(auth.currentUser){
        const convertedName = cycle.name.split(' ').join('');
        const document = doc(db, `users/${auth.currentUser.email}/trainingCycles`,convertedName)// 

        const convertedCycle: convertedCycle = {name: cycle.name, startDate: cycle.startDate, weeks: cycle.weeks};

        try{
            const result = await setDoc(document, convertedCycle)
            //now we need to set the cycle's workout scheme, which needs to be another subcollection.
            for(let i in cycle.workoutScheme){

                for(let j in cycle.workoutScheme[i].exercises){

                    const exercise: any = {exerciseData: cycle.workoutScheme[i].exercises[j].exercise.data, ...cycle.workoutScheme[i].exercises[j]} 
                    //flatten the exercise.exercise garbage.
                    exercise.exercise = exercise.exercise.name
                    exercise.setList = []
                    //
                    await setDoc(doc(db, `users/${auth.currentUser.email}/trainingCycles/${convertedName}/workoutScheme/${cycle.workoutScheme[i].day}/exercises`,
                     cycle.workoutScheme[i].exercises[j].exercise.name),
                     exercise) //this horrible thing is for the nested exercises sub-subcollection
                }
            }
            return "success"
        }catch(error){
            console.error(error)
        }
        
        
    }else{
        return "unauthorized"
    }
}

export async function editUserCycle(name: string, cycle: Trainingcycle){//take a training cycle and save it to the user's collection called 'trainingcycles'
    if(auth.currentUser){

        const convertedName = name.split(' ').join('');
        const convertedCycleName = cycle.name.split(' ').join('')

        const documentRef = doc(db, `users/${auth.currentUser.email}/trainingCycles`,convertedCycleName)// 
        const deletedDocRef = doc(db, `users/${auth.currentUser.email}/trainingCycles`,convertedName)

        try{
            const convertedCycle: convertedCycle = {name: cycle.name, startDate: cycle.startDate, weeks: cycle.weeks};

            const result = await setDoc(documentRef, convertedCycle) //first create the new document
            
            for(let i in cycle.workoutScheme){

                for(let j in cycle.workoutScheme[i].exercises){

                    const exercise: any = {exerciseData: cycle.workoutScheme[i].exercises[j].exercise.data, ...cycle.workoutScheme[i].exercises[j]} 
                    //flatten the exercise.exercise garbage.
                    exercise.exercise = exercise.exercise.name
                    exercise.setList = []
                    //
                    await setDoc(doc(db, `users/${auth.currentUser.email}/trainingCycles/${convertedName}/workoutScheme/${cycle.workoutScheme[i].day}/exercises`,
                        cycle.workoutScheme[i].exercises[j].exercise.name),
                        exercise) //this horrible thing is for the nested exercises sub-subcollection
                }
            }
            if(convertedCycleName != convertedName) {const deleteResult = await deleteDoc(deletedDocRef)}//delete the old doc after updating.

        }catch(error){
            throw(error)
        }
        return "success"
    }else{
        return "unauthorized"
    }
}

export async function deleteUserCycle(cycleName: string){
    
    if(auth.currentUser){
        const convertedName = cycleName.split(' ').join('');
        try{
            //console.log(convertedName)
            const result = await deleteDoc(doc(db, `users/${userEmail}/trainingCycles`, convertedName))
            //console.log('success')
        }catch(error){
            throw(error)
        }
    }else{
        return "unauthorized"
    }

}

export async function readUserCycles(): Promise<any>{
    if(auth.currentUser){
        
        try{
            const trainingCyclesRef = collection(db, `users/${auth.currentUser.email}/trainingCycles`) //reference to the collections trainingCycles which contain the training cycles
            const result = await getDocs(trainingCyclesRef)//first get the results.
            //result is an array of documents where the id is the name and the data are the fields.
            if(result){
                const out: Trainingcycle[] = [];

                for(const doc of result.docs){
                    const cycleData= doc.data()
                    const emptyCycle: Workout[] = []
                    //to store all the read data.

                    //now get the workout scheme collections
                    const workoutRef = collection(db, `users/${userEmail}/trainingCycles/${doc.data().name}/workoutScheme`) //reference to the collections workoutScheme
                    const workoutDocs = await getDocs(workoutRef)

                   for(const workoutDoc of workoutDocs.docs){
                        const workoutData = workoutDoc.data();
                        //we have to grab the exercises too. Thank god this project is small. 
                        const dayRef = collection(db, `users/${userEmail}/trainingCycles/${doc.data().name}/workoutScheme/${workoutData.day}`) //reference to each individual day's collection of exercises.
                        const dayDocs = await getDocs(dayRef)

                        const emptyWorkout: Exerciseprog[] = []//for filling in the exercises.

                        for(const exercise of dayDocs.docs){//truncated exercise object. Same as exerciseprog but with no setlist
                            //uh oh we have to build a exerciseprog object.
                            const exData = exercise.data()
                            const readExercise = ExerciseProg(
                                {name: exData.exercise, data:exData.exerciseData},
                                exData.startingIntensity,
                                exData.startingWeight,
                                exData.startingReps,
                                exData.weightProgression,
                                exData.repProgression,
                                exData.repRange,
                                exData.startingSets,
                                exData.weightIncrement,
                                exData.weeks,
                                exData.setType,

                            )
                            emptyWorkout.push(readExercise)//add it to the empty workouts list for the day
                        }
                        emptyCycle.push(WorkOut(emptyWorkout,workoutData.day))
                    }
                    
                    let newCycle = TrainingCycle(cycleData.startDate, cycleData.weeks, emptyCycle, cycleData.name, 1)
                    out.push(newCycle)
                }
                //console.log(out)
                return out
            }
        }catch(error){
            console.log(error)
            return [];
        }
    }
   
    return []
}

