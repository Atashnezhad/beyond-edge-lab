import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  imports: [CommonModule]
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      // Implement your image upload logic here
      console.log('Uploading file:', this.selectedFile.name);
      // You would typically send this file to your server or a cloud storage service
    } else {
      console.log('No file selected');
    }
  }
}
