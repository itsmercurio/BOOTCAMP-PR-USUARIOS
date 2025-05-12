import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './entities/users/users.component';

export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'usuarios',component: UsersComponent}
];
