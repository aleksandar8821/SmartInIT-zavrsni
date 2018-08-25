import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	email: string;
	password: string;

	@ViewChild("progressBar") progressBar: ElementRef
	@ViewChild("btnLogin") btnLogin: ElementRef

  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
  }

  public login(email: string, password: string){
  	this.renderer.setStyle(this.progressBar.nativeElement, 'visibility', 'visible')
    this.renderer.setProperty(this.btnLogin.nativeElement, 'disabled', true)

  	this.authService.login(email, password).then(() => {
  		this.renderer.setStyle(this.progressBar.nativeElement, 'visibility', 'hidden')
      this.renderer.setProperty(this.btnLogin.nativeElement, 'disabled', false)

  		this.router.navigateByUrl('/galleries');
  	}).catch(() => {
  		this.renderer.setStyle(this.progressBar.nativeElement, 'visibility', 'hidden')
      this.renderer.setProperty(this.btnLogin.nativeElement, 'disabled', false)

  	})
  }

}
