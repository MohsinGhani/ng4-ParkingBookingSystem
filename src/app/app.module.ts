import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing'
import { AdminService } from './services/admin.service'
import { UserService } from './services/user.service';
import { NavComponent } from './nav/nav.component'
import { MdInputModule, MdButtonModule, MdCardModule,MaterialModule,MdIconModule  } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { UserNavComponent } from './user-nav/user-nav.component';
import { SadarParkingComponent } from './sadar-parking/sadar-parking.component';
import { GulshanParkingComponent } from './gulshan-parking/gulshan-parking.component';
import { DhaParkingComponent } from './dha-parking/dha-parking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { UsersComponent } from './users/users.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CommentsComponent } from './comments/comments.component';
import { AuthGuard } from "app/services/auth.guard";
import { AdminAuthGuard } from "app/services/admin-auth.guard";
import { ConfigSlotsService } from "./config-slots.service";


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserLoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    HomeComponent,
    NavComponent,
    UserNavComponent,
    SadarParkingComponent,
    GulshanParkingComponent,
    DhaParkingComponent,
    UserProfileComponent,
    MyBookingComponent,
    FeedbackComponent,
    AdminNavComponent,
    UsersComponent,
    AdminFeedbackComponent,
    AboutProjectComponent,
    AboutMeComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MaterialModule,
    MdIconModule ,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [AdminService,UserService,AuthGuard,AdminAuthGuard,ConfigSlotsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
