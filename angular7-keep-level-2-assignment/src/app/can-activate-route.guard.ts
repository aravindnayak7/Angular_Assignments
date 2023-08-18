import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';


@Injectable()

export class CanActivateRouteGuard implements CanActivate {
  constructor(private authservice:AuthenticationService,private routerservice: RouterService) {
    this.authservice = inject(AuthenticationService);
    this.routerservice = inject(RouterService);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const bearerToken = this.authservice.getBearerToken();
      if(bearerToken!=null){
        const authStatus:Promise<boolean>=this.authservice.isUserAuthenticated(bearerToken);
        if(authStatus){
          console.log("Data...");
          return true;
        }else{
          this.routerservice.routeToLogin();
          return false;
        }
        return false;
      }
  }
}
// export class CanActivateRouteGuard implements CanActivate {
//   private bearertoken: string;
//   private isAuthenticated: boolean;
//   constructor(private routeService: RouterService, private authService: AuthenticationService) {
//     this.bearertoken = authService.getBearerToken();
//     this.isAuthenticated = true;
//   }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return new Promise<boolean>((resolve, reject) => {
//       this.authService.isUserAuthenticated(this.bearertoken).then(resp => {
//         if (!resp) {
//           reject(false);
//           this.routeService.routeToLogin();
//         } else {
//           resolve(true);
//         }
//       });
//     });

//   }
// }
// @Injectable({
//   providedIn : "root"
// })
// export class CanActivateRouteGuard implements CanActivate {

//   constructor() {
//     return true;
//   }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//     throw new Error('Method not implemented.');
//   }
  
//   // canActivate(
//   //   next: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
//   // }
// }
// export const canactivateGuard: CanActivateFn =
// (route, state):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>
// {
//   var mystatus:boolean=false;
//   const authservice:AuthenticationService = inject(AuthenticationService);
//   const routerservice:RouterService = inject(RouterService);
//   const bearerToken = localStorage.getItem("bearerToken");
//   if(bearerToken !=null)

//   {
//     const authStatus:any = authservice.isUserAuthenticated(bearerToken);
//     console.log("Auth Status in Guard"+authStatus);
//     if(authStatus)
//     {
//       console.log("Data ..");
//       mystatus=true;
//     }
//   }
//   else{
//     routerservice.routeToLogin();
//     mystatus=false;
//   }
//   console.log(mystatus);
//   return mystatus;
// }