import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  log:any = {};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


    login(data: any){
    

      let user = data.value;

      this.auth.signUser(user.email, user.password).then( (data:any)=>{
       
          if(data.user){

            console.log(data.user.uid);

            this.router.navigateByUrl('/dashboard/home')
          }

      }).catch(err =>{
          console.log(err);
      });
  
  }
}
