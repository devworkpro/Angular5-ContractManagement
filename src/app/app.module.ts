import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { UserService } from './user.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TabsModule } from 'ngx-tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Step1Component } from './register/step1/step1.component';
import { Step2Component } from './register/step2/step2.component';
import { PlanComponent } from './register/plan/plan.component';
import { Ng2FileRequiredModule } from 'ng2-file-required';
import { BillingComponent } from './register/billing/billing.component';
import { SummaryComponent } from './register/summary/summary.component';
import { NgxStripeModule } from 'ngx-stripe';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AuthGuard } from './authguard.service';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HeaderComponent } from './header/header.component';
import { CreationtypeComponent } from './creation/creationtype/creationtype.component';
import { ContracttypeComponent } from './creation/contracttype/contracttype.component';
import { UploadtemplateComponent } from './creation/uploadtemplate/uploadtemplate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    Step1Component,
    Step2Component,
    PlanComponent,
    BillingComponent,
    SummaryComponent,
    LandingpageComponent,
    HeaderComponent,    
    CreationtypeComponent, 
    ContracttypeComponent, 
    UploadtemplateComponent,    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    TabsModule,
    BrowserAnimationsModule,
    JasperoAlertsModule,
    Ng2FileRequiredModule,
    NgxStripeModule.forRoot('pk_test_3wPz5eGWAe1mfF44sUaAP53U'),
    BsDatepickerModule.forRoot(),
    NgxQRCodeModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
