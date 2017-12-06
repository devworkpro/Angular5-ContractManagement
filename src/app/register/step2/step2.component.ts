import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user.service';
import { RegisterViewModel } from '../registerViewModel';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['../register.component.css']
})
export class Step2Component implements OnInit {
  step2Form: NgForm;
  ProfilePicForm = false;
  AdvancedForm = true;
  AdvancedData;
  FormData1;
  @Output() AfterAdv = new EventEmitter();
  @ViewChild('step2Form') currentForm: NgForm;
  registerViewModel: RegisterViewModel;
  private formErrors = {
    'coperate_add': '',
    'city': '',
    'state': '',
    'phone_no': '',
    'password': '',
    'confirm_pass': '',
    'gender': '',
    'terms': '',
    'profile_pic': ''
  };

  private validationMessages = {
    'coperate_add': {
      'required': 'Please enter your Coperate Address .'
    },
    'city': {
      'required': 'Please enter your city name .'
    },
    'state': {
      'required': 'Please enter your state name .'
    },
    'phone_no': {
      'required': 'Please enter your phone number.',
      'pattern': 'Please enter only number'
    },
    'password': {
      'required': 'Password field cannot be blank!',
      'minlength': 'Password must be at least 8 characters long.'
    },
    'confirm_pass': {
      'required': 'Password field cannot be blank!'
    },
    'gender': {
      'required': 'This field is required.'
    },
    'terms': {
      'required': 'Please select your term of service'
    },
    'profile_pic': {
      'required': ''
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
    if (this.currentForm === this.step2Form) { return; }
    this.step2Form = this.currentForm;

    if (this.step2Form) {
      this.step2Form.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  private onValueChanged(data?: any) {
    if (!this.step2Form) { return; }
    const form = this.step2Form.form;

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

  submitAdvForm1(data) {
    // check password and Confirm Password
    if (data.password === data.confirm_pass) {
      this.ProfilePicForm = true;
      this.AdvancedForm = false;
      this.FormData1 = data;
    }
    // tslint:disable-next-line:one-line
    else {
      $('#confirm_password').html('Password and Confirm password not matched');
    }
  }

  movetoBasic() {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '0');
    myInput.setAttribute('style', 'width:0%');
    document.getElementById('ProgText').innerHTML = '';
  }

  Confirmpassword(e) {
    $('#confirm_password').html('');
  }


  fileChanged(e: Event) {
    let file;
    let filename;
   // let reader;
    const target: HTMLInputElement = e.target as HTMLInputElement;
    file = target.files[0];

    /* reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        localStorage.removeItem('UploadImage');
        localStorage.setItem('UploadImage', e.target.result);
      };
    })();
    reader.readAsDataURL(file);
    const imgPath = localStorage.getItem('UploadImage');
    this.AdvancedData = { profile_pic: file, imgPath: imgPath };*/
    this.AdvancedData = { profile_pic: file };
    Object.assign(this.AdvancedData, this.FormData1);
    console.log('file testing 2', this.AdvancedData);
    filename = file.name;
    document.getElementById('file_name').innerHTML = filename;

    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '30');
    myInput.setAttribute('style', 'width:30%');
    document.getElementById('ProgText').innerHTML = '30% Complete';

  }

  BacktoAdv1() {
    this.AdvancedForm = true;
    this.ProfilePicForm = false;
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '10');
    myInput.setAttribute('style', 'width:10%');
    document.getElementById('ProgText').innerHTML = '10% Complete';
  }

  MovetoPlan() {
    this.AfterAdv.emit(this.AdvancedData);
    $('.nav-tabs > .active').next('li').find('a').attr('data-toggle', 'tab');
    $('.nav-tabs > .active').next('li').find('a').attr('href', '#menu4').trigger('click');

    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '70');
    myInput.setAttribute('style', 'width:70%');
    document.getElementById('ProgText').innerHTML = '70% Complete';


  }

}
