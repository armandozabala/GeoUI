import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = ''

  constructor(private http: HttpClient, public  afAuth:  AngularFireAuth, private router: Router) { }


  createUser(email:any, password:any){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signUser(email:any, password:any){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }


  isAuth(){
      return this.afAuth.authState;
  }


  statusUser(){
console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') == null ){
       return false;
    }else{
      return true;
    
    }
   /*this.afAuth.authState.subscribe(user => {
      if (user){
          console.log(user);
          return true;
      } else {
        localStorage.setItem('user', null);
          return false;
      }
     });*/
   }
}
