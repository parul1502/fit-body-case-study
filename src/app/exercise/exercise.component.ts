import { Component, OnInit } from '@angular/core';
import { IExercise } from '../modal/exercise';
import { IUserProfile } from '../modal/userprofile';
import { FitbodyService } from '../services/fitbodyservices';
import { IDateExercise } from '../modal/dateExercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _fitbodyService: FitbodyService) { }
exercise: IExercise[];
exerciseItem: string[];
item: string;
itemR: string;
i: number;
exerciseDetails: IExercise[] = [];
exerciseCa: IExercise[] = [];
exerciseDetailsF: IExercise[] = [];
email: string;
profile: IUserProfile;
exerciseCat: string[];
searchedExercise: IExercise[];
searchExercise: string;
deleteExercise: string;
dateFetch: string;
newDateExercise: IDateExercise;
isDate: boolean;
  ngOnInit() {
    this._fitbodyService.getExercise().subscribe((exercise: IExercise[]) => {
      this.exercise = exercise;
      console.log(this.exercise);
      this.exerciseItem = this.exercise.map(f => f.category);
      this.exerciseCat = this.exerciseItem.filter((elem, index) => {
      return index === this.exerciseItem.indexOf(elem);
      });
      console.log(this.exerciseCat);
      });
    this.email = localStorage.getItem('email');
    this.getProfile(this.email);
      }

      CExercise() {
        this.exerciseCa = [];
        console.log('Exercise caa' + this.item);
        this.exercise.forEach(m => {
          if (m.category === this.item) {
            console.log(m);
            this.exerciseCa.push(m);
          }
        });
      }

      display() {
        console.log(this.dateFetch);
        this.getProfile(this.email);
      }

      getProfile(email: string) {
        if (this.dateFetch === undefined ) {
          console.log('if');
          this.exerciseDetails = [];
        } else {
          console.log('else');
          this._fitbodyService.getProfile(email)
      .subscribe(profile => {
      this.profile = profile;
      console.log(this.profile);
      this.profile.exerciseDone.forEach((date1) => {
        console.log(date1.date);
        if (this.dateFetch === date1.date) {
         this.exerciseDetails = date1.exercises;
         this.isDate = true;
        }
    });
      if (this.isDate !== true) {
        this.profile.exerciseDone.push({
        date: this.dateFetch,
        exercises: []
      });
  }
      console.log(this.exerciseDetails);
    });
      }
    }

      addExercise = () => {
        this.profile.exerciseDone.filter((date1) => {
          console.log(date1.date);
          if (this.dateFetch === date1.date) {
            this.exercise.forEach(m => {
              if (m.exerciseName[0] === this.itemR) {
                this.exerciseDetails.push(m);
              }
            });
            console.log(this.exerciseDetails);
            date1.exercises = this.exerciseDetails;
            this._fitbodyService.updateProfile(this.profile, this.email)
      .subscribe(data => console.log(data));
            console.log(this.profile.exerciseDone);
          }
      });
          }

      findExercise() {
      this.searchedExercise = this.exercise.filter((foo) => foo.exerciseName.indexOf(this.searchExercise) !== -1);
      console.log(this.searchedExercise);
      }

      deleteItem = (index: number) => {
        this.profile.exerciseDone.filter((date1) => {
          console.log(date1.date);
          if (this.dateFetch === date1.date) {
           this.exerciseDetails.splice(index, 1);
           console.log(this.exerciseDetails);
           date1.exercises = this.exerciseDetails;
           this._fitbodyService.updateProfile(this.profile, this.email)
      .subscribe(data => console.log(data));
           console.log(this.profile.exerciseDone);
          }
      });
        }

        add(exe1) {
          this.itemR = exe1.exerciseName[0];
          this.addExercise();
        }
}
