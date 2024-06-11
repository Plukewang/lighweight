import { Workout} from "./exercises";

export const ConvertWeekday = (date: number):string =>{
    switch (date){
        case 1: 
            return 'Monday';
            break;
        case 2:
            return 'Tuesday';
            break;
        case 3:
            return 'Wednesday';
            break;
        case 4:
            return 'Thursday';
            break;
        case 5:
            return 'Friday';
            break;
        case 6:
            return 'Saturday';
            break;
        case 7:
            return 'Sunday';
            break;
        default:
            return 'Monday'
    }
}

export const ConvertWeekdayTrunc = (date: number):string =>{
    switch (date){
        case 1: 
            return 'Mon';
            break;
        case 2:
            return 'Tues';
            break;
        case 3:
            return 'Wed';
            break;
        case 4:
            return 'Thurs';
            break;
        case 5:
            return 'Fri';
            break;
        case 6:
            return 'Sat';
            break;
        case 7:
            return 'Sun';
            break;
        default:
            return 'Mon'
    }
}