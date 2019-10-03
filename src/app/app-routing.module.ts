import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FoodComponent } from './food/food.component';
import { CreateFoodComponent } from './create-food/create-food.component';
import { CreatefoodguardService } from './guard/createfoodguard.service';
import { ProfileguardService } from './guard/profileguard.service';
import { LoginguardService } from './guard/loginguard.service';
import { ExerciseComponent } from './exercise/exercise.component';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'profile', canActivate: [LoginguardService], canDeactivate: [ProfileguardService], component: UserProfileComponent},
  {path: 'food', canActivate: [LoginguardService], component: FoodComponent},
  {path: 'exercise', canActivate: [LoginguardService], component: ExerciseComponent},
  {path: 'food/create', canDeactivate: [CreatefoodguardService], component: CreateFoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
