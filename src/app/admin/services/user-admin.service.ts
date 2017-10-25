import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';


@Injectable()
export class UserAdminService {
  private users: User[] = [];

  constructor(private http: Http) { }

  getUsers () {
    
  }
}
