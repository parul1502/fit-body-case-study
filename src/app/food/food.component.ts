import { Component, OnInit } from '@angular/core';
import { IFood } from '../modal/food';
import { FitbodyService } from '../services/fitbodyservices';
import { IUserProfile } from '../modal/userprofile';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _fitbodyService: FitbodyService) { }

  food: IFood[];
  fooditem: string[];
  item: string;
  i: number;
  dateFetch: string;
  foodDetails: IFood[] = [];
  email: string;
  profile: IUserProfile;
  searchedFood: IFood[];
  searchFood: string;
  isDate: boolean;

  ngOnInit() {
    this._fitbodyService.getFood().subscribe((food: IFood[]) => {
        this.food = food;
        this.fooditem = this.food.map(f => f.foodName);
        });
    this.email = localStorage.getItem('email');
    this.getProfile(this.email);
    
  }
  getProfile(email: string) {
    if (this.dateFetch === undefined ) {
      console.log('if');
      this.foodDetails = [];
    } else {
      console.log('else');
      this._fitbodyService.getProfile(email)
  .subscribe(profile => {
  this.profile = profile;
  console.log(this.profile.foodeaten);
  this.profile.foodeaten.filter((date1) => {
    console.log(date1.date);
    if (this.dateFetch === date1.date) {
      console.log('true');
      this.foodDetails = date1.foods;
      this.isDate = true;
    }
});
  if (this.isDate !== true) {
  this.profile.foodeaten.push({
  date: this.dateFetch,
  foods: []
});
  }
  console.log(this.foodDetails);
});
  }
  }

  addFood() {
    this.profile.foodeaten.filter((date1) => {
      console.log(date1.date);
      if (this.dateFetch === date1.date) {
        this.food.forEach(m => {
          if (m.foodName === this.item) {
            this.foodDetails.push(m);
          }
        });
        console.log(this.foodDetails);
        date1.foods = this.foodDetails;
        this._fitbodyService.updateProfile(this.profile, this.email)
  .subscribe(data => console.log(data));
        console.log(this.profile.foodeaten);
      }
  });
  }
    findfood() {
     this.searchedFood =  this.food.filter((foo) => foo.foodName.indexOf(this.searchFood) !== -1);
}
display() {
  console.log(this.dateFetch);
  this.getProfile(this.email);
}

deleteItem = (index: number) => {
  this.profile.foodeaten.filter((date1) => {
    console.log(date1.date);
    if (this.dateFetch === date1.date) {
     this.foodDetails.splice(index, 1);
     console.log(this.foodDetails);
     date1.foods = this.foodDetails;
     this._fitbodyService.updateProfile(this.profile, this.email)
.subscribe(data => console.log(data));
     console.log(this.profile.exerciseDone);
    }
});
  }

  add(food1) {
    this.item = food1.foodName;
    this.addFood();
    console.log(food1.foodName);
  }
}
