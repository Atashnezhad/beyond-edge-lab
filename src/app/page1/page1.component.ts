import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageTestComponent } from '../components/message-test/message-test.component';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
  imports: [CommonModule, MessageTestComponent]
})
export class Page1Component {
  // images: string[] = [
  //   'assets/images/image1.jpeg',
  //   'assets/images/image2.jpeg',
  //   'assets/images/image3.jpeg',
  //   'assets/images/image4.jpg',
  //   'assets/images/image5.jpg',
  //   'assets/images/image6.jpg',
  // ];
  images = [
    { src: 'assets/images/image1.jpeg', alt: 'Image 1', message: 'Message for Image 1' },
    { src: 'assets/images/image2.jpeg', alt: 'Image 2', message: 'Message for Image 2' },
    { src: 'assets/images/image3.jpeg', alt: 'Image 3', message: 'Message for Image 3' },
    { src: 'assets/images/image4.jpg', alt: 'Image 4', message: 'Message for Image 4' },
    { src: 'assets/images/image5.jpg', alt: 'Image 5', message: 'Message for Image 5' },
    { src: 'assets/images/image6.jpg', alt: 'Image 6', message: 'Message for Image 6' },
  ];
}
