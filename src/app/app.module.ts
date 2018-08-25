import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { HttpModule } from '@angular/http'; //<<< ovaj je deprecated! treba koristiti HttpClientModule umesto HttpModule, a za ono sto je tebi bilo potrebno u ovom projektu mozes kasnije u  servisima uvesti samo HttpClient koji je zapravo samo deo ovog dole HttpClientModule >>> https://stackoverflow.com/questions/48124136/angular-4-difference-between-httpclient-and-httpclientmodule
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './shared/services/auth.service';
import { GalleryService } from './shared/services/gallery.service';
import { AppComponent } from './app.component';
import { ViewGalleryComponent } from './components/view-gallery/view-gallery.component';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GalleriesComponent } from './components/galleries/galleries.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';


@NgModule({
  declarations: [
    AppComponent,
    ViewGalleryComponent,
    ViewImageComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    GalleriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    // PopoverModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, GalleryService, AuthGuard, GuestGuard],
  bootstrap: [AppComponent],
  entryComponents: [ ViewImageComponent ]
})
export class AppModule { }
