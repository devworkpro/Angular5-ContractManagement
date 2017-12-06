import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true;
  loadinghalf = false;
  dashboard= false;
  constructor(private route: Router) { }

  ngOnInit() {
     setTimeout(() => {

     this.loading = false;
     this.loadinghalf = true; 
     setTimeout(() => {
     this.loading = false;
     this.loadinghalf = false;
     this.dashboard = true;    
     }, 2000);

     }, 2000);
  }

  Logout() {
    localStorage.removeItem('tokenKey');
    localStorage.removeItem('UserId');
  }

}
