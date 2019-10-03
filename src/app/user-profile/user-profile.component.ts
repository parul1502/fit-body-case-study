import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControlName } from '@angular/forms';
import { IUserProfile } from '../modal/userprofile';
import { ActivatedRoute, Router } from '@angular/router';
import { FitbodyService } from '../services/fitbodyservices';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;
  profileForm: FormGroup;
  email: string;
  profile: IUserProfile;
  private sub: Subscription;
  newPassword: string;

  get tags(): FormArray {
  return this.profileForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private profileService: FitbodyService) {
  }

  ngOnInit(): void {
  this.profileForm = this.fb.group({
  email: [''],
  password: [''],
  firstName: [''],
  LastName: [''],
  Gender: [''],
  Birthday: [''],
  Height: [''],
  Activity: [''],
  Weight: [''],
  BMI: [''],
  calories: [''],
  points: ['']
    });
  this.email = localStorage.getItem('email');
  this.getProfile(this.email);
  }

  getProfile(email: string): void {
  this.profileService.getProfile(email)
  .subscribe({
  next: (profile: IUserProfile) => this.displayProfile(profile),
  error: err => this.errorMessage = err
  });
  }

  displayProfile(profile: IUserProfile): void {
  if (this.profileForm) {
  this.profileForm.reset();
  }
  this.profile = profile;
  console.log(this.profile);
  this.profileForm.patchValue({
  email: this.profile.email,
  password: this.profile.password,
  firstName: this.profile.firstName,
  LastName: this.profile.LastName,
  Birthday: this.profile.Birthday,
  Height: this.profile.Height,
  Weight: this.profile.Weight,
  BMI: this.profile.BMI,
  calories: this.profile.calories
  });
  }
  saveProfile(): void {
  const p = { ...this.profile, ...this.profileForm.value };
  console.log(p.password, this.profile.password);
  if (p.password === this.profile.password) {
  if (this.newPassword !== undefined) {
    p.password = this.newPassword;
  }
  console.log(p);
  this.updateProfile(p, this.email);
  } else {
    alert('enter the correct current password');
  }
  }
  updateProfile(profile: IUserProfile, email: string): void {
    this.profileService.updateProfile(profile, email)
    .subscribe({
    next: () => this.onSaveComplete(),
    error: err => this.errorMessage = err
    });
    }
  onSaveComplete(): void {
  // Reset the form to clear the flags
  this.profileForm.reset();
  // this.router.navigate(['/profiles']);
  }
  }
