import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFood } from '../modal/food';
import { FitbodyService } from '../services/fitbodyservices';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent implements OnInit {

  constructor(private fb: FormBuilder, private fitbodyServices: FitbodyService) { }
  createfood: FormGroup;
  food: IFood;
  ngOnInit() {
    this.createfood = this.fb.group({
      foodName: '',
      ServingNo: 0,
      Calories: 0,
      Fat: 0,
      SaturatedFat: 0,
      Carbohydrates: 0,
      Fiber: 0,
      Sugar: 0,
      Protein: 0,
      Sodium: 0
      });
  }
  createFood() {
    const p = { ...this.food, ...this.createfood.value };
    console.log(p);
    this.fitbodyServices.createProduct(p).subscribe({next: data => console.log(data),
    error: e => console.log(e)});
  }
}
