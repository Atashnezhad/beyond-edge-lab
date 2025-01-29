import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-media-capture',
  standalone: true, // ✅ Required for standalone components
  imports: [CommonModule], // ✅ Add CommonModule here
  templateUrl: './media-capture.component.html',
  styleUrls: ['./media-capture.component.css']
})
export class MediaCaptureComponent {
  imageSrc: string | null = null;
  videoSrc: string | null = null;

  @ViewChild('imageInput') imageInput!: ElementRef;
  @ViewChild('videoInput') videoInput!: ElementRef;

  // Open file input for image capture
  captureImage() {
    this.imageInput.nativeElement.click();
  }

  // Open file input for video capture
  captureVideo() {
    this.videoInput.nativeElement.click();
  }

  // Handle selected file (image or video)
  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'image') {
          this.imageSrc = reader.result as string;
          this.videoSrc = null; // Reset video
        } else if (type === 'video') {
          this.videoSrc = reader.result as string;
          this.imageSrc = null; // Reset image
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
