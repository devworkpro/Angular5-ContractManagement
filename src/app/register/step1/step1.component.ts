import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user.service';
import { RegisterViewModel } from '../registerViewModel';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['../register.component.css']
})
export class Step1Component implements OnInit {
  public firstname;
  public password;
  step1Form: NgForm;
  @Output() AfterBasic = new EventEmitter();
  @ViewChild('step1Form') currentForm: NgForm;
  registerViewModel: RegisterViewModel;
  minDate = new Date(2016, 5, 10);
  maxDate = new Date(2017, 12, 15);
  ngModel: Date = new Date();

  private formErrors = {
    'first_name': '',
    'middle_name': '',
    'last_name': '',
    'dob': '',
    'email': '',
    'confirm_email': '',
    'company_name': '',
    'job_title': '',
  };

  private validationMessages = {
    'first_name': {
      'required': 'Please enter your first name.'
    },
    'middle_name': {
      'required': 'Please enter your middle name.'
    },
    'last_name': {
      'required': 'Please enter your last name.'
    },
    'dob': {
      'required': 'Please select your date of brith.'
    },
    'email': {
      'required': 'Please enter correct email.',
      'pattern': 'Please enter correct format.'
    },
    'confirm_email': {
      'required': 'Please enter correct email.',
      'pattern': 'Please enter correct format.'
    },
    'company_name': {
      'required': 'Please enter your company name.'
    },
    'job_title': {
      'required': 'Please enter your job title.'
    }

  };

  constructor(private userService: UserService, private http: Http, private route: Router) {
    this.registerViewModel = new RegisterViewModel();
  }

  ngOnInit() { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.step1Form) { return; }
    this.step1Form = this.currentForm;

    if (this.step1Form) {
      this.step1Form.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  private onValueChanged(data?: any) {
    if (!this.step1Form) { return; }
    const form = this.step1Form.form;

    // tslint:disable-next-line:forin
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

  submitBasicForm(data) {
    this.AfterBasic.emit(data);
    if (data.email === data.confirm_email) {
      // check mailid exist or not into database 
      let email;
      let status;
      email = data.email;
      this.userService.checkEmailAdd(email).subscribe((response) => {
      status = response.status;
        if (status === 200) {
          $('#email2').html();
          $('.nav-tabs > .active').next('li').find('a').attr('data-toggle', 'tab');
          $('.nav-tabs > .active').next('li').find('a').attr('href', '#menu2').trigger('click');

          let myInput;
          myInput = document.getElementById('ProgBar');
          myInput.setAttribute('aria-valuenow', '10');
          myInput.setAttribute('style', 'width:10%');
          document.getElementById('ProgText').innerHTML = '10% Complete';

        }
        // tslint:disable-next-line:one-line
        else {
          $('#databaseemail').html('Email already exist into database');
        }

      });
    }
    // tslint:disable-next-line:one-line
    else{
      $('#Confirmemail').html('Email and Confirm email not matched');
    }
  }

  Confirmemail(e) {
    $('#Confirmemail').html('');
  }

  Checkmail(e) {
    $('#databaseemail').html('');
  }
}
