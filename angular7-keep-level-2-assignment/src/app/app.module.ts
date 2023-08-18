import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatFormField, MatFormFieldModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NotesService } from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';

const routes: Routes = [
{path:"",redirectTo:"login",pathMatch:"full"},
{path:'login',component:LoginComponent},
{path:'dashboard',component:DashboardComponent,canActivate:[CanActivateRouteGuard]},
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    RouterModule,
    RouterModule.forRoot(routes)
   ],
  providers: [ AuthenticationService,
               RouterService,
               NotesService,
               CanActivateRouteGuard
               ],
  bootstrap: [ AppComponent ],
  exports: [
    RouterModule
  ]
})

export class AppModule { }
