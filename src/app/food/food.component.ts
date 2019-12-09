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
  totalCalories: number;
  totalFat: number;
  totalSaturatedFat: number;
  totalSodium: number;
  totalCarbohydrates: number;
  totalFiber: number;
  totalSugar: number;
  totalProtein: number;
  totalPoints: number;
  ngOnInit() {
    this._fitbodyService.getFood().subscribe((food: IFood[]) => {
        this.food = food;
        this.fooditem = this.food.map(f => f.foodName);
        });
    this.email = localStorage.getItem('email');
    this.totalCalories = 0;
    this.totalFat = 0;
    this.totalSaturatedFat = 0;
    this.totalSodium = 0;
    this.totalCarbohydrates = 0;
    this.totalFiber = 0;
    this.totalSugar = 0;
    this.totalProtein = 0;
    this.totalPoints = 0;
    this.getProfile(this.email);

  }
  getProfile(email: string) {
    if (this.dateFetch === undefined ) {
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
      this.totalCalories = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.Calories).reduce((tot, amt) => tot + amt);
      this.totalFat = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.Fat).reduce((tot, amt) => tot + amt);
  // tslint:disable-next-line: max-line-length
      this.totalSaturatedFat = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.SaturatedFat).reduce((tot, amt) => tot + amt);
      this.totalSodium = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.Sodium).reduce((tot, amt) => tot + amt);
  // tslint:disable-next-line: max-line-length
      this.totalCarbohydrates = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.Carbohydrates).reduce((tot, amt) => tot + amt);
      this.totalFiber = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.Fiber).reduce((tot, amt) => tot + amt);
      this.totalSugar = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.Sugar).reduce((tot, amt) => tot + amt);
      this.totalProtein = this.foodDetails.length === 0 ? 0 : this.foodDetails.map(food => food.Protein).reduce((tot, amt) => tot + amt);
  // tslint:disable-next-line: max-line-length
      this.totalPoints = this.totalCalories + this.totalFat + this.totalSaturatedFat + this.totalSodium + this.totalCarbohydrates + this.totalFiber + this.totalSugar + this.totalProtein;
    }
});
  if (this.isDate !== true) {
  this.profile.foodeaten.push({
  date: this.dateFetch,
  foods: []
});
  this._fitbodyService.updateProfile(this.profile, this.email)
  .subscribe(data => console.log(data));
  }
});
  }
  }

  addFood() {
    if (this.dateFetch === undefined) {
       return alert('Kindly select  a date');
    }
    this.profile.foodeaten.filter((date1) => {
      console.log(date1.date);
      if (this.dateFetch === date1.date) {
        this.food.forEach(m => {
          if (m.foodName === this.item) {
            this.foodDetails.push(m);
            this.totalCalories = this.totalCalories + m.Calories;
            this.totalFat = this.totalFat + m.Fat;
            this.totalSaturatedFat = this.totalSaturatedFat + m.SaturatedFat;
            this.totalSodium = this.totalSodium + m.Sodium;
            this.totalCarbohydrates = this.totalCarbohydrates + m.Carbohydrates;
            this.totalFiber = this.totalFiber + m.Fiber;
            this.totalSugar = this.totalSugar + m.Sugar;
            this.totalProtein = this.totalProtein + m.Protein;
            this.totalPoints = this.totalPoints + m.Points;
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
       this.totalCalories = this.totalCalories - this.foodDetails[index].Calories;
       this.totalFat = this.totalFat - this.foodDetails[index].Fat;
       this.totalSaturatedFat = this.totalSaturatedFat - this.foodDetails[index].SaturatedFat;
       this.totalSodium = this.totalSodium - this.foodDetails[index].Sodium;
       this.totalCarbohydrates = this.totalCarbohydrates - this.foodDetails[index].Carbohydrates;
       this.totalFiber = this.totalFiber - this.foodDetails[index].Fiber;
       this.totalSugar = this.totalSugar - this.foodDetails[index].Sugar;
       this.totalProtein = this.totalProtein - this.foodDetails[index].Protein;
       this.totalPoints = this.totalPoints - this.foodDetails[index].Points;
       this.foodDetails.splice(index, 1);
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

  editFood(val, food) {
    console.log(food.ServingNo);
    console.log(val);
    food.ServingNo = val;
    this._fitbodyService.updateProfile(this.profile, this.email)
.subscribe(data => console.log(data));
    console.log(food.ServingNo);
  }
}
