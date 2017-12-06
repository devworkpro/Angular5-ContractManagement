import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService implements OnInit {

  constructor(public http: Http) { }
  ngOnInit() { }


  login(username, password) {
    return this.http.post('http://localhost:8080/api/v1/login', {
      email: username, password: password
    }).map((res: Response) => res.json());

  }

   verifysmscode(id, code) {
     return this.http.post('http://localhost:8080/api/v1/verifysmscode', {
       _id: id, smscode: code
     }).map((res: Response) => res.json());
   }

  checkEmailAdd(email) {
    return this.http.post('http://localhost:8080/api/v1/checkemail', {
      email: email
    }).map((res: Response) => res.json());

  }

  register(Alldata) {

    let headers;
    let data;
    let file;
    let url;
    file = Alldata.profile_pic;
    url = 'http://localhost:8080/api/v1/register';

    data = new FormData();
    data.append('pic', file);
    data.append('first_name', Alldata.first_name);
    data.append('middle_name', Alldata.middle_name);
    data.append('last_name', Alldata.last_name);
    data.append('dob', Alldata.dob);
    data.append('email', Alldata.email);
    data.append('company_name', Alldata.company_name);
    data.append('job_title', Alldata.job_title);
    data.append('coperate_add', Alldata.coperate_add);
    data.append('city', Alldata.city);
    data.append('state', Alldata.state);
    data.append('phone_no', Alldata.phone_no);
    data.append('password', Alldata.password);
    data.append('gender', Alldata.gender);
    data.append('plan_id', Alldata.plan_id);
    data.append('billing_name', Alldata.billing_name);
    data.append('billing_phone', Alldata.billing_phone);
    data.append('token', Alldata.token);
    data.append('smscode', '');

    headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data; boundary=${data._boundary}');
    return this.http.post(url, data, headers).map((res: Response) => res.json());

  }


  plans() {
    return this.http.get('http://localhost:8080/api/v1/listplan', {}).
      map((res: Response) => res.json());
  }

  getPlan(plan_id) {
    return this.http.post('http://localhost:8080/api/v1/getPlan', {
      data: plan_id
    }).
      map((res: Response) => res.json());
  }

  sendsms(to, msg) {

    let url;
    url = 'https://sms.inteliblock.com/playsms/index.php?app=ws&u=admin&h=890d1f0563d515c0d23487610f45ba01&op=pv&to='.concat(to + '&msg=' + msg);
    return this.http.get(url)
      .map((res: Response) => res.json());

  }

}
