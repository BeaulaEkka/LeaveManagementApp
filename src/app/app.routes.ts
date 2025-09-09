import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path:'',
    component:Layout,
    children:[
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', redirectTo: '/login' },
      {path:'',component:EmployeeComponent}
    ]
  }


];
