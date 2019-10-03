import { Injectable } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileguardService implements CanDeactivate<UserProfileComponent> {
  canDeactivate(component: UserProfileComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.profileForm.dirty) {
      const foodName = component.profileForm.get('foodName').value || 'New Food';
      return confirm(`Navigate away and loose all changes to ${foodName}?`);
    }
    return true;
  }
}
