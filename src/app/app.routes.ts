import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home/home.component';
import { authGuard } from './auth/auth.guard';
import { MyReservationsComponent } from './home/my-reservations/my-reservations.component';

export const routes: Routes = [

    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path: 'home',  component: HomeComponent, canActivate: [authGuard]},
    { path: 'my-reservations', component: MyReservationsComponent, canActivate: [authGuard] },
    {path:'**', redirectTo: '/login',pathMatch:'full'}
];
