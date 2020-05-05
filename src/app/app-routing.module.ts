import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  {  
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: 'home', component: UploadComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
