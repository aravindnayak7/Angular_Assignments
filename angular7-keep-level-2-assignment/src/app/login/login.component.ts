import { Component, NgModule } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { RouterService } from "../services/router.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  // uObj: User;
  loginForm: FormGroup;
  submitMessage: string;

  constructor(
   
    private authservice: AuthenticationService,
    private routerservice: RouterService
  ) {
    // this.uObj = new User();
    this.submitMessage = "";
    this.loginForm = new FormGroup({
     
      username:this.username,
      password:this.password
    })
  }
  loginSubmit() {
    // if (this.loginForm.valid) {
      // this.uObj = this.loginForm.value;

      // console.log(this.uObj.username);
      // console.log(this.uObj.password);

      this.authservice.authenticateUser(this.loginForm.value).subscribe(
        (res: any) => {
          console.log("token" + res["token"]);
          this.authservice.setBearerToken(res["token"]);
          this.routerservice.routeToDashboard();
        },
        err=>{
          if(err.status === 404){
            this.submitMessage='Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
          }
          else if(err.status==403){
            this.submitMessage='Unauthorized';
          }
          else{
            this.submitMessage=err.error.message;
          }
        }
      );
    }
  }
// }
