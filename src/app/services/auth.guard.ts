import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from "app/services/user.service";
import { Location } from "@angular/common"
import 'rxjs/add/operator/map'
import "rxjs/add/operator/take";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public _AngularFireAuth: AngularFireAuth,private _Router: Router, private _UserService:UserService,private _location:Location){}
  canActivate() {
        return this._AngularFireAuth.authState.map(user => {
            if (user != null) {
                return true;
            }
            else {
                this._Router.navigate(['/user-login']);
                return false;
            }
        }).take(1)
  }
} 
