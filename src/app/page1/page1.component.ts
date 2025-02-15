import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageUploadComponent } from '../components/image-upload/image-upload.component';
import { ImageUpload2Component } from '../components/image-upload-2/image-upload-2.component';
import { VisualizerComponent } from "../components/visualizer/visualizer.component";


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
  standalone: true,
  imports: [CommonModule, ImageUpload2Component, VisualizerComponent, VisualizerComponent]
})
export class Page1Component {

  images = [
    { src: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzY3MWVycjM3dmpvbzAzeDI1dmdia2JjZ3EwczF3c3NyaWRqZXpyeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3nSGQ045gEvvQFRm/giphy.gif', alt: 'Image 1', message: 'Message for Image 1' , info: 'This is image 1 description.', showInfo: false },
    { src: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4NTFpamo1djM4MGp3MndmZTNzM2o4bXlnZTRhamdhZWZqcDM5MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xRGuaM7FFZSZq/giphy.gif', alt: 'Image 2', message: 'Message for Image 2', info: 'This is image 1 description.', showInfo: false  },
    { src: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDBiYjczZHQxZHQ2OHJwNTZhM2RpZjQ1cHR2aGNjYmplazhiN254ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6kpxY5eEgVfY4/giphy.gif', alt: 'Image 3', message: 'Message for Image 3', info: 'This is image 1 description.', showInfo: false  },
    { src: 'https://www.imbio.com/wp-content/uploads/2021/04/LDAi_video.mov-high.gif', alt: 'Image 4', message: 'Message for Image 4', info: 'This is image 1 description.', showInfo: false  },
    { src: 'https://miguelcortez.wordpress.com/wp-content/uploads/2012/12/tumblr_m1vnlarvsl1qznovwo1_1280.gif', alt: 'Image 5', message: 'Message for Image 5', info: 'This is image 1 description.', showInfo: false   },
    { src: 'https://mriquestions.com/uploads/3/4/5/7/34572113/6292453_orig.gif', alt: 'Image 6', message: 'Message for Image 6', info: 'This is image 1 description.', showInfo: false   },
    { src: 'https://i.imgur.com/76GDC7h.gif', alt: 'Image 1', message: 'Message for Image 1', info: 'This is image 1 description.', showInfo: false   },
    { src: 'https://i.pinimg.com/originals/e1/bf/5f/e1bf5f63fd66ccdc3d14d5a1aa0172e7.gif', alt: 'Image 2', message: 'Message for Image 2', info: 'This is image 1 description.', showInfo: false   },
  ];
  
  toggleInfo(image: any) {
    image.showInfo = !image.showInfo;
    console.log('Image clicked:', image.alt, 'showInfo:', image.showInfo);
    
  }

  
}
