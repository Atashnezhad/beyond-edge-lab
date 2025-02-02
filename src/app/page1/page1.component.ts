import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class Page1Component {

  images = [
    { src: 'assets/images/image1.jpeg', alt: 'Image 1', message: 'Message for Image 1' , info: 'This is image 1 description.', showInfo: false },
    { src: 'assets/images/image2.jpeg', alt: 'Image 2', message: 'Message for Image 2', info: 'This is image 1 description.', showInfo: false  },
    { src: 'assets/images/image3.jpeg', alt: 'Image 3', message: 'Message for Image 3', info: 'This is image 1 description.', showInfo: false  },
    { src: 'assets/images/image4.jpg', alt: 'Image 4', message: 'Message for Image 4', info: 'This is image 1 description.', showInfo: false  },
    { src: 'assets/images/image5.jpg', alt: 'Image 5', message: 'Message for Image 5', info: 'This is image 1 description.', showInfo: false   },
    { src: 'assets/images/image4.jpg', alt: 'Image 6', message: 'Message for Image 6', info: 'This is image 1 description.', showInfo: false   },
    { src: 'assets/images/image3.jpeg', alt: 'Image 1', message: 'Message for Image 1', info: 'This is image 1 description.', showInfo: false   },
    { src: 'assets/images/image3.jpeg', alt: 'Image 2', message: 'Message for Image 2', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image9.jpeg', alt: 'Image 3', message: 'Message for Image 3', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image10.jpeg', alt: 'Image 4', message: 'Message for Image 4', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image11.jpeg', alt: 'Image 5', message: 'Message for Image 5', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image12.jpeg', alt: 'Image 6', message: 'Message for Image 6', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image13.jpeg', alt: 'Image 4', message: 'Message for Image 4', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image14.jpeg', alt: 'Image 5', message: 'Message for Image 5', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image15.jpeg', alt: 'Image 6', message: 'Message for Image 6', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image4.jpg', alt: 'Image 4', message: 'Message for Image 4', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image5.jpg', alt: 'Image 5', message: 'Message for Image 5', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image6.jpg', alt: 'Image 6', message: 'Message for Image 6', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image7.jpeg', alt: 'Image 1', message: 'Message for Image 1', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image8.jpeg', alt: 'Image 2', message: 'Message for Image 2', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image9.jpeg', alt: 'Image 3', message: 'Message for Image 3', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image10.jpeg', alt: 'Image 4', message: 'Message for Image 4', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image11.jpeg', alt: 'Image 5', message: 'Message for Image 5', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image10.jpeg', alt: 'Image 4', message: 'Message for Image 4', info: 'This is image 1 description.', showInfo: false   },
    // { src: 'assets/images/image11.jpeg', alt: 'Image 5', message: 'Message for Image 5', info: 'This is image 1 description.', showInfo: false   },
  ];
  
  toggleInfo(image: any) {
    image.showInfo = !image.showInfo;
    console.log('Image clicked:', image.alt, 'showInfo:', image.showInfo);
    
  }

  
}
