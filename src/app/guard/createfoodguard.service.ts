import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateFoodComponent } from '../create-food/create-food.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatefoodguardService implements CanDeactivate<CreateFoodComponent> {
  canDeactivate(component: CreateFoodComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.createfood.dirty) {
      const foodName = component.createfood.get('foodName').value || 'New Food';
      return confirm(`Navigate away and loose all changes to ${foodName}?`);
    }
    return true;
  }

}
