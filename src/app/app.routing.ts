import { Routes, RouterModule,Router } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { AdminLoginComponent } from './admin-login/admin-login.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { UsersComponent } from './users/users.component'
import { BookingComponent } from './booking/booking.component'
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component'
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'
import { UserLoginComponent } from './user-login/user-login.component'
import { SadarParkingComponent } from './sadar-parking/sadar-parking.component'
import { GulshanParkingComponent } from './gulshan-parking/gulshan-parking.component'
import { DhaParkingComponent } from './dha-parking/dha-parking.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { MyBookingComponent } from './my-booking/my-booking.component'
import { FeedbackComponent } from './feedback/feedback.component'
import { AboutProjectComponent } from './about-project/about-project.component'
import { AboutMeComponent } from './about-me/about-me.component'
import { CommentsComponent } from './comments/comments.component'
import { AuthGuard } from "app/services/auth.guard";
import { AdminAuthGuard } from "app/services/admin-auth.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminLoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate:[AdminAuthGuard] },
    { path: 'admin-dashboard/users', component: UsersComponent, canActivate:[AdminAuthGuard] },
    { path: 'admin-dashboard/booking', component: BookingComponent, canActivate:[AdminAuthGuard] },
    { path: 'admin-dashboard/admin-feedback', component: AdminFeedbackComponent, canActivate:[AdminAuthGuard] },
    { path: 'user-login', component: UserLoginComponent },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate:[AuthGuard] },
    { path: 'user-dashboard/sadar-parking', component: SadarParkingComponent, canActivate:[AuthGuard] },
    { path: 'user-dashboard/gulshan-parking', component: GulshanParkingComponent, canActivate:[AuthGuard] },
    { path: 'user-dashboard/dha-parking', component: DhaParkingComponent, canActivate:[AuthGuard] },
    { path: 'user-dashboard/user-profile', component: UserProfileComponent, canActivate:[AuthGuard] },
    { path: 'user-dashboard/my-booking', component: MyBookingComponent, canActivate:[AuthGuard] },
    { path: 'user-dashboard/feedback', component: FeedbackComponent, canActivate:[AuthGuard] },
    { path: 'about-project', component: AboutProjectComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'comments', component: CommentsComponent },
    {path:'**', component: HomeComponent}
];

export const routing = RouterModule.forRoot(appRoutes);