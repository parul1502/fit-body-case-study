import { IDateExercise } from './dateExercise';
import { IDateFood } from './dateFood';

export interface IUserProfile {
        email: string;
        password: string;
        firstName: string;
        LastName: string;
        Gender: string;
        foodeaten: IDateFood[];
        exerciseDone: IDateExercise[];
        Birthday: string;
        Height: number;
        Activity: string;
        Weight: number;
        BMI: string;
        calories: number;
        points: string;
}
