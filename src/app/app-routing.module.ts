import { AttendanceComponent } from './attendance/attendance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  //  canActivate: [LoginGuard]
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'student',
  component: StudentComponent
},
{
  path: 'attendance',
  component: AttendanceComponent
},
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '**', redirectTo: 'login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
