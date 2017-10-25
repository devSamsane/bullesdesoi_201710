import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { User } from '../../models/user';

@Component({
  selector: 'bds-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/users')
      .map(res => console.log(res.json()))
      .subscribe();
  }

}
