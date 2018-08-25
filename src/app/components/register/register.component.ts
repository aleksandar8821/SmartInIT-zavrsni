import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public user: User = new User();
	@ViewChild("progressBar") progressBar: ElementRef
	@ViewChild("btnRegister") btnRegister: ElementRef

  constructor(
  			private router: Router,
  			private authService: AuthService,
  	    private renderer: Renderer2
  	) { }

  ngOnInit() {
  }

  public register(user: User){
    // console.log(user);
    this.renderer.setStyle(this.progressBar.nativeElement, 'visibility', 'visible')
    this.renderer.setProperty(this.btnRegister.nativeElement, 'disabled', true)

    setTimeout(() => {
      this.authService.register(user);
      this.renderer.setStyle(this.progressBar.nativeElement, 'visibility', 'hidden')
      this.renderer.setProperty(this.btnRegister.nativeElement, 'disabled', false)

    }, 500)
  }

}
