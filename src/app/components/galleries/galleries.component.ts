import { Component, OnInit, HostListener  } from '@angular/core';
import { GalleryService } from '../../shared/services/gallery.service';
import { Gallery } from '../../shared/models/gallery'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {

	public showedGalleries: Array<Gallery> = []
	public showedImagesNumber: number = 3

	@HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(event.target.innerWidth);
    if(event.target.innerWidth < 575.98){
      this.showedImagesNumber = 2
    }else{
      this.showedImagesNumber = 3
    }
   
  }

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
  	this.galleryService.getGalleries().subscribe(
  	      data => {
            console.log(data);
            // this.loadGalleries()
            this.showedGalleries = data
  	      },
  	      (err: HttpErrorResponse) => {
  	        alert(`Server returned code ${err.status} with message: ${err.error.error}`);
  	        console.log(err)
  	      }
  	);
  }

  public screenWidthChange(mediaQuery){
    // let self = this
    if (mediaQuery.matches) {
      // console.log(this);
      this.showedImagesNumber = 2
    } else {
      // console.log(self);
      this.showedImagesNumber = 3
    }
  }

  public resizeImageIfVertical($event){
    // console.log($event.target.parentElement);
    // kako dobaviti dimenzije slike https://davidwalsh.name/get-image-dimensions
    if (($event.target.naturalHeight / $event.target.naturalWidth) >= 1.5) {
      $event.target.parentNode.style.width = '50%'
    } else if(($event.target.naturalHeight / $event.target.naturalWidth) >= 1.2){
      $event.target.parentNode.style.width = '65%'
    }
  }

}
