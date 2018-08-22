import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(){
    firebase.initializeApp({
      apiKey: "AIzaSyCJxm_QbMrSQuKdhRPRX2hxjVRStG7MmJM",
      authDomain: "smartinit-zavrsni.firebaseapp.com",
      databaseURL: "https://smartinit-zavrsni.firebaseio.com",
      projectId: "smartinit-zavrsni",
      storageBucket: "smartinit-zavrsni.appspot.com",
      messagingSenderId: "757219458625"
    })
  }

  ngOnInit(){

	  
  	
  }

}
