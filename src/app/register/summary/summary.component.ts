import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['../register.component.css']
})
export class SummaryComponent implements OnInit {
  SummrayForm = true;
  CongratulationsForm = false;
  @Input() Alldata;
  @Input() userData;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  QRCodeValue;
  Userid = '';
  Username;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {

    this.Alldata = {
      first_name: '',
      middle_name: '',
      last_name: '',
      dob: '',
      email: '',
      company_name: '',
      job_title: '',
      coperate_add: '',
      city: '',
      state: '',
      phone_no: '',
      gender: '',
      selectedPlan: { name: '', interval: '', amount: '' },
    };

    /*this.userData = {

      user: { profile_pic: '' },
    };*/
    this.userData = {

      profile_pic: '' 
    };

  }


  BacktoBilling() {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '80');
    myInput.setAttribute('style', 'width:80%');
    document.getElementById('ProgText').innerHTML = '80% Complete';
  }

  ViewUser() {
    this.Userid = this.Alldata.Userid;
    this.QRCodeValue = this.Alldata.first_name.concat(' ' + this.Alldata.middle_name).concat(' ' + this.Alldata.last_name);
    this.SummrayForm = false;
    this.CongratulationsForm = true;
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '100');
    myInput.setAttribute('style', 'width:100%');
    document.getElementById('ProgText').innerHTML = '100% Complete';
  }

  login() {
    this.route.navigate(['/login']);
  }
}
