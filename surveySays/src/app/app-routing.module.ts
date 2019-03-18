import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' },  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
