import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterViewModel } from './registerViewModel';
import { UserService } from '../user.service';
import * as moment from 'moment';
declare var jquery: any;
declare var $: any;

@Component({

  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})

export class RegisterComponent implements OnInit {
  Alldata;
  registerForm: NgForm;
  logoimgUrl = '';
  UserSelectedPlan;
  User;
  getData;
  @ViewChild('registerForm') currentForm: NgForm;
  registerViewModel: RegisterViewModel;
  ngOnInit() {
    this.logoimgUrl = 'assets/images/logo.png';
  }

  constructor(private userService: UserService) {
  }

  ChangeBasicForm(data): void {
    let  dateformat;
    dateformat = moment(data.dob).format('DD-MM-YYYY');
    data.dob = dateformat;
    this.Alldata = data;
    this.Alldata.selectedPlan = {};
    this.Alldata.imgPath = '';
    console.log('move testing', this.Alldata);
  }

  ChangeAdvForm(data): void {
    Object.assign(this.Alldata, data);
    console.log('step 2 testing', this.Alldata);
  }

  ChangePlanForm(data): void {
    Object.assign(this.Alldata, data);
    this.UserSelectedPlan = this.Alldata.selectedPlan;
    console.log('plan testing', this.Alldata);
    $('.nav-tabs > .active').next('li').find('a').attr('data-toggle', 'tab');
    $('.nav-tabs > .active').next('li').find('a').attr('href', '#menu5').trigger('click');
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '80');
    myInput.setAttribute('style', 'width:80%');
    document.getElementById('ProgText').innerHTML = '80% Complete';
  }

  ChangeBillingForm(data): void {
    Object.assign(this.Alldata, data);
    console.log('billing testing', this.Alldata);
    $('.nav-tabs > .active').next('li').find('a').attr('data-toggle', 'tab');
    $('.nav-tabs > .active').next('li').find('a').attr('href', '#menu6').trigger('click');
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '90');
    myInput.setAttribute('style', 'width:90%');
    document.getElementById('ProgText').innerHTML = '90% Complete';

    this.userService.register(this.Alldata).subscribe((response) => {
      console.log('Final res', response);
      this.getData = response.user;
      this.User = { 'Userid': response.user._id};
      Object.assign(this.Alldata, this.User);
    });
  }

}
