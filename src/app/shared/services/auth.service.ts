import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

	public isAuthenticated: boolean;
  private loggedUser: User
  public loggedUserNameFirstLetter: string

	public token: string;

  constructor(private router: Router) { 
	  this.isAuthenticated = Boolean(window.localStorage.getItem('loginToken'));
    this.loggedUserNameFirstLetter = window.localStorage.getItem('loggedUserNameFirstLetter')
    this.token = window.localStorage.getItem('loginToken')
    /*if(this.isAuthenticated){
	    if(firebase.auth().currentUser){
	    	firebase.auth().currentUser.getIdToken().then((token: string) => {
	    		if(token !== this.token){
	    			alert("Your session is expired, please log in again.")
	    			this.logout()
	    		}
	    	})
	    }
    	
    }*/

    // Nasao ovde https://stackoverflow.com/questions/37873608/how-do-i-detect-if-a-user-is-already-logged-in-firebase
    /*firebase.auth().onAuthStateChanged((user) => {
      
      console.log(user);
      
      if(!user){
      	// Ovaj uslov isAuthenticated ispitujem, jer ako je on false to znaci da je user manualno izlogovan, a taj slucaj ovde nema potrebe da hendlujem
      	if(this.isAuthenticated){
	      	this.logout()
      		alert('Your session is expired, please log in again!')
      	}
      }else{
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          if(token !== this.token){
            alert("Your session is expired, please log in again.")
            this.logout()
          }
        })
      }
      if(user){

        firebase.auth().currentUser.getIdToken().then((token: string) => {
          if(token !== this.token){
            alert("Your session is expired, please log in again.")
            this.logout()
          }
        })

      }

    });*/

  }

  public getRequestHeaders(){
    return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'))
  }

  public getAndCheckToken(){
  	/*console.log(firebase.auth().currentUser);

  	if(firebase.auth().currentUser){
  		firebase.auth().currentUser.getIdToken().then((token: string) => {
  			if(token !== this.token){
  				alert("Your session is expired, please log in again.")
  				this.logout()
  			}
  		})
  	}*/
    // Nasao ovde https://stackoverflow.com/questions/37873608/how-do-i-detect-if-a-user-is-already-logged-in-firebase
    firebase.auth().onAuthStateChanged((user) => {
      
      console.log(user);
      
      if(user){

        firebase.auth().currentUser.getIdToken().then((token: string) => {
          if(token !== this.token){
            alert("Your session is expired, please log in again.")
            this.logout()
          }
        })
        
      }

    });

  	return this.token;
  }

  public register(user: User){
  	firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
  			() => {
  				alert('You have successfully registered!')
  			}
  		).catch(
  			(error) => {
  				alert(error)
  			}
  		)
  }

  public login(email: string, password: string){

  	return new Promise((resolve, reject) => {
  		firebase.auth().signInWithEmailAndPassword(email, password).then(
  			(response) => {
	  			firebase.auth().currentUser.getIdToken().then(
	  				(token) => {
	  					this.token = token
	  					window.localStorage.setItem('loginToken', token)
	  					this.isAuthenticated = true;
			        this.loggedUserNameFirstLetter = response.user.email.charAt(0).toUpperCase()
              window.localStorage.setItem('loggedUserNameFirstLetter', this.loggedUserNameFirstLetter)
			        window.localStorage.setItem('loggedUserEmail', response.user.email)
	  					resolve()
	  				}	
  				)
				}).catch(
					(error) => {
						alert('You have provided invalid credentials!')
						console.log(error);
						reject()
					}
				)
  	})


  }

  public logout(event?) {
  	if(event)
      event.preventDefault()
      this.isAuthenticated = false;
      firebase.auth().signOut()
      window.localStorage.removeItem('loginToken');
      window.localStorage.removeItem('loggedUserEmail');
      window.localStorage.removeItem('loggedUserNameFirstLetter');
      this.loggedUserNameFirstLetter = '';
      this.router.navigateByUrl('/login');
  }

}
