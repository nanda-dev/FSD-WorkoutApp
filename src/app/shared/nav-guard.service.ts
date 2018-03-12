import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { UserService } from "./user.service";

@Injectable()
export class NavGuardService implements CanActivate {
    constructor(private userSvc: UserService,
                private router: Router){}
    canActivate(next: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        return this.userSvc.isLoggedIn().map(e => {
            if (e) {
                console.log("user logged in");
                return true;
            }
            console.log("user NOT logged in");
            return false;
        }).catch(() => {
            console.log("goto login");
            this.router.navigate(['/login']);
            return Observable.of(false);
        });
    }

}