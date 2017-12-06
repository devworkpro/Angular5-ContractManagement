import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creationtype',
  templateUrl: './creationtype.component.html',
  styleUrls: ['./creationtype.component.css']
})
export class CreationtypeComponent implements OnInit {

    loading = true;
  	creation = false;
  	constructor() { }

	ngOnInit() {
	  	setTimeout(() => {
	    	this.loading = false;
	     	this.creation = true; 
	    }, 2000);
 	}
 
}
