import {IUserProfile} from './userprofile';
import { IFood } from './food';
import { IExercise } from './exercise';
export interface IFitbody {
      UserProfile: IUserProfile[];
      Food: IFood[];
      Exercise: IExercise[];
}
