import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { UserService } from '../../user.service';
import { NgForm } from '@angular/forms';
import { RegisterViewModel } from '../registerViewModel';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['../register.component.css'],
})

export class PlanComponent implements OnInit {

  Plans;
  planForm: NgForm;
  @Output() AfterPlan = new EventEmitter();
  @ViewChild('planForm') currentForm: NgForm;
  registerViewModel: RegisterViewModel;
  private formErrors = {
    'plan_id': ''
  };

  private validationMessages = {
    'plan_id': {
      'required': 'Please Select your Kryptonforce Plan'
    }
  };
  constructor(private userService: UserService) {
    this.registerViewModel = new RegisterViewModel();
  }

  ngOnInit() {
    this.userService.plans().subscribe((response) => {
      this.Plans = response.plans.data;
      this.Plans.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return a.amount - b.amount ;
      });
//      console.log(this.Plans);
    });
  }

  formChanged() {
    if (this.currentForm === this.planForm) { return; }
    this.planForm = this.currentForm;

    if (this.planForm) {
      this.planForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  private onValueChanged(data?: any) {
    if (!this.planForm) { return; }
    const form = this.planForm.form;

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
  
  BacktoPlanTab() {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '30');
    myInput.setAttribute('style', 'width:30%');
    document.getElementById('ProgText').innerHTML = '30% Complete';
  }

  submitPlanForm(data) {
    let SelectedPlan;
    const plan_id = data.plan_id;
     this.userService.getPlan(plan_id).subscribe((response) => {
      SelectedPlan = response.plan;
      data.selectedPlan = SelectedPlan;
      this.AfterPlan.emit(data);
    });
  }

}
