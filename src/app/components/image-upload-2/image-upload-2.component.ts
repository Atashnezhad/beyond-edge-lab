import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload-2',
  templateUrl: './image-upload-2.component.html',
  styleUrls: ['./image-upload-2.component.css'],
  imports: [CommonModule]
})
export class ImageUpload2Component {
  selectedFile: File | null = null;
  processedImageUrl: string | null = null;
  apiUrl: string = 'http://localhost:5000/process_image';

  imageWidth: number = 300; // Set default width
  imageHeight: number = 300; // Set default height

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post(this.apiUrl, formData, { responseType: 'blob' }).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'image/png' });
        this.processedImageUrl = URL.createObjectURL(blob);
      },
      (error) => {
        console.error('Error uploading image:', error);
        alert('Error processing image.');
      }
    );
  }
}
