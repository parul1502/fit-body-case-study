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
totalMinutes: number;
totalCaloriesBurned: number;
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
    this.totalMinutes = 0;
    this.totalCaloriesBurned = 0;
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
         // tslint:disable-next-line: max-line-length
         this.totalMinutes = this.exerciseDetails.length === 0 ? 0 : this.exerciseDetails.map(ex => ex.minutes).reduce((tot, amt) => tot + amt);
         // tslint:disable-next-line: max-line-length
         this.totalCaloriesBurned = this.exerciseDetails.length === 0 ? 0 : this.exerciseDetails.map(ex => ex.calories_burned).reduce((tot, amt) => tot + amt);
        }
    });
      if (this.isDate !== true) {
        this.profile.exerciseDone.push({
        date: this.dateFetch,
        exercises: []
      });
        this._fitbodyService.updateProfile(this.profile, this.email)
  .subscribe(data => console.log(data));
  }
      console.log(this.exerciseDetails);
    });
      }
    }

      addExercise = () => {
        if (this.dateFetch === undefined) {
          return alert('Kindly select  a date');
       }
        this.profile.exerciseDone.filter((date1) => {
          console.log(date1.date);
          if (this.dateFetch === date1.date) {
            this.exercise.forEach(m => {
              if (m.exerciseName[0] === this.itemR) {
                this.exerciseDetails.push(m);
                this.totalCaloriesBurned = this.totalCaloriesBurned + m.calories_burned;
                this.totalMinutes = this.totalMinutes + m.minutes;
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
      console.log(this.searchedExercise );
      }

      deleteItem = (index: number) => {
        this.profile.exerciseDone.filter((date1) => {
          console.log(date1.date);
          if (this.dateFetch === date1.date) {
            this.totalCaloriesBurned = this.totalCaloriesBurned - this.exerciseDetails[index].calories_burned;
            this.totalMinutes = this.totalMinutes - this.exerciseDetails[index].minutes;
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

        editExercise(val, exer) {
          console.log(exer.minutes);
          exer.minutes = val;
          this._fitbodyService.updateProfile(this.profile, this.email)
      .subscribe(data => console.log(data));
          console.log(exer.minutes);
        }
}
