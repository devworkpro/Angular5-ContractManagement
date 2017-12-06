import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './authguard.service';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CreationtypeComponent } from './creation/creationtype/creationtype.component';
import { ContracttypeComponent } from './creation/contracttype/contracttype.component';
import { UploadtemplateComponent } from './creation/uploadtemplate/uploadtemplate.component';
const appRoutes: Routes = [

    { path: '', component: LandingpageComponent, pathMatch: 'full' },
    { path: 'login',    component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      component: DashboardComponent
    },
    { 
      path: 'creation',
      canActivate: [AuthGuard], 
      component: CreationtypeComponent 
    },

    { 
      path: 'contract',
      canActivate: [AuthGuard], 
      component: ContracttypeComponent 
    },

    { 
      path: 'upload',
      canActivate: [AuthGuard], 
      component: UploadtemplateComponent 
    },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, /* { enableTracing: true } */ );
