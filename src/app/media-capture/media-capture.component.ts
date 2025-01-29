import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-capture.component.html',
  styleUrls: ['./media-capture.component.css']
})
export class MediaCaptureComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  
  imageSrc: string | null = null;
  videoSrc: string | null = null;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];
  stream: MediaStream | null = null;

  async startCamera(useFrontCamera: boolean = true) {
    try {
      const constraints = {
        video: { facingMode: useFrontCamera ? "user" : "environment" },
        audio: true
      };
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = this.stream;
      this.videoElement.nativeElement.play();
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  }
  
  

  // Capture image from video stream
  captureImage() {
    if (!this.videoElement || !this.canvasElement) return;
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    this.imageSrc = canvas.toDataURL('image/png'); // Save image as base64
  }

  // Start video recording
  startRecording() {
    if (!this.stream) return;
    
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream);
    
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      this.videoSrc = URL.createObjectURL(blob);
    };

    this.mediaRecorder.start();
  }

  // Stop video recording
  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  // Stop camera
  stopCamera() {
    this.stream?.getTracks().forEach(track => track.stop());
    this.videoElement.nativeElement.srcObject = null;
  }
}
