import { Component, OnInit } from '@angular/core';
import { FitbodyService } from '../services/fitbodyservices';
import { IUserProfile } from '../modal/userprofile';
import { Data } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { IFood } from '../modal/food';
import { IExercise } from '../modal/exercise';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  errorMessage: string;
  food: IFood[];
  exercise: IExercise[];
  profile: IUserProfile;
  email: string;
  message: string;
  weight: number;
  height: number;
  bmi: string;
  trueBmi: number;
  d =  new Date();
  // tslint:disable-next-line: max-line-length
  date = (this.d.getFullYear()) + '-' + (this.d.getMonth() + 1) + '-' + (this.d.getDate() <= 9 ? '0' + (this.d.getDate() - 1)  : (this.d.getDate() - 1));
  constructor(private profileService: FitbodyService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.getProfile(this.email);
    }

    getProfile(email: string): void {
    this.profileService.getProfile(email)
    .subscribe({
    next: (profile: IUserProfile) => this.getReport(profile),
    error: err => this.errorMessage = err
    });
    }

    getReport( profile: IUserProfile ) {
      this.profile = profile;
      this.weight = profile.Weight;
      this.height = profile.Height;
      this.bmi = profile.BMI;
      this.trueBmi = ((this.weight) * 100) / (this.height * this.height);
      // tslint:disable-next-line: radix
      if (this.trueBmi === Number.parseInt(this.bmi)) {
        this.message = 'Perfect Weight';
      // tslint:disable-next-line: radix
      } else if (this.trueBmi >= Number.parseInt(this.bmi)) {
        this.message = 'Under Weight';
      } else {
        this.message = 'Over Weight';
      }
      console.log(this.date);
      profile.foodeaten.filter((f) => {
        if ( f.date === this.date) {
          console.log(f.foods);
          this.food = f.foods;
          return f.foods;
        }
      });
      profile.exerciseDone.filter((e) => {
        if ( e.date === this.date) {
          console.log(e.exercises);
          this.exercise = e.exercises;
          return e.exercises;
        }
      });
   }
}
