import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GalleriesComponent } from '../components/galleries/galleries.component';
import { ViewGalleryComponent } from '../components/view-gallery/view-gallery.component';
import { ViewImageComponent } from '../components/view-image/view-image.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

import { AuthGuard } from '../shared/guards/auth.guard';
import { GuestGuard } from '../shared/guards/guest.guard';


const appRoutes: Routes = [
	{
	    path: '',
      redirectTo: '/galleries',
      pathMatch: 'full'
	},
	{
      path: 'galleries',
      canActivate: [AuthGuard],
      component: GalleriesComponent
  },
	{
	    path: 'galleries/:galleryID',
	    canActivate: [AuthGuard],
	    data: { reuse: true },
	    component: ViewGalleryComponent
	},
	{
	    path: 'galleries/:galleryID/:imageID',
	    canActivate: [AuthGuard],
	    data: { reuse: true },
	    component: ViewGalleryComponent
	},
	{
			path: 'register',
			canActivate: [GuestGuard],
			component: RegisterComponent
	},
	{
			path: 'login',
			canActivate: [GuestGuard],
			component: LoginComponent
	}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
    	appRoutes
    	)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
