import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common'
import { AngularFireAuth } from "angularfire2/auth";
import 'rxjs/add/operator/map'
import "rxjs/add/operator/take";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(public _AngularFireAuth: AngularFireAuth,private _Router: Router,private _Location: Location){}
  canActivate(){
    return this._AngularFireAuth.authState.map(user => {
            if (user != null) {
                if(user.email == 'admin@gmail.com'){
                    return true;
                }
                else{
                    this._Location.back();
                }
            }
            else {
                this._Router.navigate(['/admin']);
                return false;
            }
        }).take(1)
  }
}
