import { User } from '../../shared/models/user'; 
import { Image } from '../../shared/models/image'; 
import { GalleryComment } from '../../shared/models/gallery-comment'; 


export class Gallery {

	constructor(

		public id?: number,
		public name?: string,
		public description?: string,
		public user_id?: number,
 		public created_at?: string,
 		public updated_at?: string,
 		public user?: User,
		public images: Array<Image> = [],
		// Morao sam ovo da promenim zbog toga sto u template-u koristim semantiku sa backenda koja je snake_case public comments: Array<GalleryComment> = [],
		public comments: Array<any> = [],
		public showedImagesNumber?: number

	){

	}

}
