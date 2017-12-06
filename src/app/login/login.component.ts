import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService} from '../user.service';
import { AlertsService } from '@jaspero/ng2-alerts';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({

  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {

  public username;
  public password;

  loginForm: NgForm;
  logoimgUrl = '';
  LoginForm = true;
  SMSForm = false;
  icon1 = '';
  icon2 = '';
  icon3 = '';
  icon4 = '';

  private formErrors = {
    'username': '',
    'password': '',
    'smscode': '',
  };

  private validationMessages = {
    'username': {
      'required': 'Email is required',
      'pattern': 'Please enter correct format'
    },
    'password': {
      'required': 'Password is required'
    },
    'smscode': {
      'required': 'SMS Code is required',
      'minlength' :'SMS must be at least 5 characters'
    },
  };

  @ViewChild('loginForm') currentForm: NgForm;
  constructor(private userService: UserService, private http: Http, private route: Router, private _alert: AlertsService) {
  }

  ngOnInit() {
    this.logoimgUrl = 'assets/images/logo.png';
    this.icon1 = 'assets/images/user_icon.png';
    this.icon2 = 'assets/images/user_icon1.png';
    this.icon3 = 'assets/images/user_icon2.png';
    this.icon4 = 'assets/images/user_icon3.png';
   }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.loginForm) { return; }
      this.loginForm = this.currentForm;
    if (this.loginForm) {
      this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  private onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  Login(username, password) {
    this.userService.login(username, password).subscribe(           // Successful responses call the first callback.      
      data => {
        this.LoginForm = false;
        this.SMSForm = true;
        let phone;
        let message;
        let smscode;
        let loginUser;
        let userid;
        loginUser =  data.user;
        phone = '1'.concat(loginUser.phone_no);
        smscode = loginUser.smscode;
        message = 'Your verification code is '.concat(smscode).concat('.');
        userid = loginUser._id;
        localStorage.setItem('UserId', userid);
        console.log(smscode);
       /*  this.userService.sendsms(phone, message).subscribe((response) => {
          console.log('Test sms', response);
        }); */
      },
      err => {
        let error;
        let message;
        error = JSON.parse(err._body);
        message = error.message;
        const type = 'error';
        this._alert.create(type, message);
      }
    );
  }

  CodeloginForm(code) {
    let UserId;
    UserId = localStorage.getItem('UserId');

    this.userService.verifysmscode(UserId, code).subscribe(           // Successful responses call the first callback.
      data => {
        let token;
        token = data.token;
        this.route.navigate(['/dashboard']);
        localStorage.setItem('tokenKey', token);
      },
      err => {
        let error;
        let message;
        error = JSON.parse(err._body);
        message = error.message;
        const type = 'error';
        this._alert.create(type, message);
      }
    );

  }

}
