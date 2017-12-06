import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { UserService } from '../../user.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['../register.component.css']
})
export class BillingComponent implements OnInit {

  elements: Elements;
  card: StripeElement;
  @ViewChild('card') cardRef: ElementRef;
  @Input() SelectedPlan;
  @Output() AfterBilling = new EventEmitter();
  stripeTest: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder,
    private stripeService: StripeService) { }

  ngOnInit() {

    this.SelectedPlan = {name : '', interval : '', amount : ''}  ;

    this.stripeTest = this.fb.group({
      billing_name: ['', [Validators.required]],
      billing_phone: ['', [Validators.required]],
      billing_policy: ['', Validators.required]
    });

    this.stripeService.elements()
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {});
          this.card.mount(this.cardRef.nativeElement);
        }
      });
  }

  billingForm() {
    const name = this.stripeTest.get('billing_name').value;
    const billing_phone = this.stripeTest.get('billing_phone').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          const token = result.token;
          if (token) {
            const data = {
              'token': token.id,
              'billing_name' : name,
              'billing_phone' : billing_phone
            };
            this.AfterBilling.emit(data);
          }
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          const errorElement = document.getElementById('card-errors');
          errorElement.innerHTML = '';
          errorElement.innerHTML += result.error.message;
        }
      });
  }

  BacktoPlan() {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    let myInput;
    myInput = document.getElementById('ProgBar');
    myInput.setAttribute('aria-valuenow', '70');
    myInput.setAttribute('style', 'width:70%');
    document.getElementById('ProgText').innerHTML = '70% Complete';

  }




}
