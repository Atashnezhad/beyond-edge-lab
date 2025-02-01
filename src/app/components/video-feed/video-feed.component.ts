import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css']
})
export class VideoFeedComponent implements OnInit {
  videoStreamUrl: string = 'http://localhost:5000/video_feed'; // Flask video feed URL

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic if needed
  }
}
