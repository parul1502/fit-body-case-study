import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FitbodyService } from '../services/fitbodyservices';
import { IFitbody } from '../modal/fitbody';
import { IUserProfile } from '../modal/userprofile';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleEventAggregator } from '../services/Injectpubsub';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: max-line-length tslint:disable-next-line: variable-name
  constructor(private _fitBodyService: FitbodyService, private fb: FormBuilder, private router: Router, private eventAggregator: SimpleEventAggregator) { }
  userprofile: IUserProfile[];
  profileData: IUserProfile;
  Email: string;
  password: string;
  LoginForm: FormGroup;

  ngOnInit() {
    this.LoginForm = this.fb.group({
      userName: '',
      password: ''
      });
    this._fitBodyService.getData().subscribe((userprofile: IUserProfile[]) => {
      this.userprofile = userprofile;
  });
  }
  checkData() {
    // tslint:disable-next-line: max-line-length
    console.log(this.userprofile);
    this.profileData = this.userprofile.filter((userprofile: IUserProfile) => {
        if (userprofile.email === this.Email && userprofile.password === this.password) {
          return userprofile;
        }
      })[0];
    if (this.profileData) {
      this.eventAggregator.publish(this.profileData.email);
      localStorage.setItem('email', this.profileData.email);
      this.router.navigate(['./exercise']);
      } else {
        alert('Invalid Login Data');
      }
    return this.profileData;
  }
}
