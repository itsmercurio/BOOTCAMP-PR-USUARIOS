import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './entities/users/users-list/users.component';
import { UserFormComponent } from './entities/users/user-form/user-form.component';
import { UserEditComponent } from './entities/users/user-edit/user-edit.component';


export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'users',component: UsersComponent},
    {path:'users/create',component: UserFormComponent},
    {path:'users/edit/:id',component: UserEditComponent}
];
