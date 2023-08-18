import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { User } from "../login/user";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private authUrl: string;

  constructor(private httpClient: HttpClient) {
    this.authUrl = "http://localhost:3000/auth/v1/";
  }

  authenticateUser(userDetails: any) {
    // return this.httpClient.post(this.authUrl,userDetails);
    return this.httpClient.post(this.authUrl, userDetails);
  }

  setBearerToken(token: string) {
    localStorage.setItem("bearerToken", token);
  }

  getBearerToken() {
    return localStorage.getItem("bearerToken");
  }
  //Promise
  // isUserAuthenticated(token:string):Observable<boolean>
  // {
  //   return this.httpClient.post(`${this.authUrl}/isAuthenticated`,{},{
  //     headers:new HttpHeaders().set('Authorization',`Bearer ${token}`)
  //   }).pipe(map((res:any)=>res['isAuthenticated']));
  // }
  isUserAuthenticated(token): Promise<boolean> {
    return this.httpClient.post(this.authUrl + '/isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(map(reponse => reponse['isAuthenticated'])).toPromise();
  }
  // async isUserAuthenticated(token: string): Promise<boolean> {
  //   let status: boolean = true;
  //   try {
  //     await this.httpClient
  //       .post(
  //         `${this.authUrl}/isAuthenticated`,
  //         {},
  //         {
  //           headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
  //         }
  //       )
  //       .toPromise();
  //   } catch (error) {
  //     status = false;
  //   }
  //   return status;
  // }
}
