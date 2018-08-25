import { Injectable, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { Gallery } from '../../shared/models/gallery';
import { GalleryComment } from '../../shared/models/gallery-comment';
import { Image } from '../../shared/models/image';
import { ImageComment } from '../../shared/models/image-comment';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GalleryService {

	// moras ga inicijalizovati, jer inace nece moci da nadje push metodu na njemu!
	private galleries: Array<Gallery> = []
	// private specificGallery: Gallery //mozda je pametnije da ga ne lepis ovde, nego da napravis promenljivu unutar funkcije, onda mozda ne bi morao ovako da je reinicijalizujes na pocetku ko sto radis u getGalleries()

  constructor(private http: HttpClient, private authService: AuthService) { 
  	/*this.http.get('http://localhost:8000/api/galleries_firebase').subscribe(galleries => {
				console.log(galleries);
				let galleriesJSON = JSON.stringify(galleries)
        // Ovo sam koristio za pravljenje baze u Firebase, samo kopirao i napravio file od toga i onda importovao u Firebase
        console.log(galleriesJSON);
			})*/

  }
  

	public getGalleries()
	  {
	  	// desava se da ostanu stari rezultati, pa onda kad dobavi nove sabiraju se i duplaju i ne prikazuju kako treba, i to se sabiraju ovde u servisu a ne u komponenti!
	  	this.galleries = []
	    return new Observable((o: Observer<any>) => {
	      this.http.get('https://smartinit-zavrsni.firebaseio.com/galleries.json?auth=' + this.authService.getAndCheckToken(), {observe: 'body', responseType: 'json'})
	        .subscribe(
	          (galleries: any[]) => {
	            galleries.forEach((g) => {

	            	// let showedImagesNumber = this.setShowedImagesNumber(g)

	              this.galleries.push(new Gallery(g.id, g.name, g.description, g.user_id, g.created_at, g.updated_at, new User(g.user.id, g.user.first_name, g.user.last_name, g.user.email), g.images, g.comments/*, showedImagesNumber*/));
	            });
	            o.next(this.galleries);
	            return o.complete();
	          },
	          (err: HttpErrorResponse) => {
	          	o.error(err)
	          	return o.complete();
	          }

          );	

      });

		}



		public getSpecificGallery(id){

			id = id - 1;

	    return new Observable((o: Observer<any>) => {
	      this.http.get('https://smartinit-zavrsni.firebaseio.com/galleries/'+ id +'.json?auth=' + this.authService.getAndCheckToken(), {observe: 'body', responseType: 'json'})
	        .subscribe(
	          (gallery: any) => {
	          	
	          	console.log(gallery);
	            
	          	let fetchedGallery = new Gallery(gallery.id, gallery.name, gallery.description, gallery.user_id, gallery.created_at, gallery.updated_at, gallery.user, gallery.images, gallery.comments)

	            o.next(fetchedGallery);
	            return o.complete();
	          },
	          (err: HttpErrorResponse) => {
	          	o.error(err)
	          	return o.complete();
	          }

          );	
          
      });

		}

		

}

