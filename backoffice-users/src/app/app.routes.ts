import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './entities/users/users-list/users.component';


export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'users',component: UsersComponent},
    {path:'users/create',component: UsersComponent}
];
