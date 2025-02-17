import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  @ViewChild('rendererCanvas', { static: true }) canvasRef!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private points!: THREE.Points;
  private jsonData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Starting initialization process');
    this.loadData().then(() => {
      console.log('Data loaded, initializing scene');
      this.initScene();
      this.addPoints();
      this.addControls();
      this.animate();
    }).catch(error => {
      console.error('Initialization failed due to:', error);
    });
  }

  private loadData(): Promise<void> {
    console.log('Attempting to load JSON data');
    return new Promise((resolve, reject) => {
      this.http.get<any[]>('./assets/3d_data.json').subscribe(
        data => {
          console.log('JSON data successfully loaded');
          this.jsonData = data;
          resolve();
        },
        error => {
          console.error('Failed to load JSON data:', error);
          reject(error);
        }
      );
    });
  }

  private initScene(): void {
    console.log('Initializing scene');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(1, 1, 2);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true });
    this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      console.log('Window resized, updating camera and renderer');
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private addPoints(): void {
    console.log('Adding points to scene');
    const filteredData = this.jsonData.filter(p => p.value === 1);
    
    console.log('Number of data points available after filtering:', filteredData.length);
  
    if (filteredData.length === 0) {
      console.warn('No points to display; all values were 0.');
      return;
    }
  
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(filteredData.flatMap(p => [p.x, p.y, p.z]));
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
    // Points with semi-transparent red color
    const colors = new Float32Array(filteredData.flatMap(() => [1.0, 0.0, 0.0, 0.7])); // RGBA for semi-transparent red
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
  
    const material = new THREE.PointsMaterial({ 
      size: 0.02, 
      vertexColors: true, 
      transparent: true,
      map: this.createCircleTexture()
    });
    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  private createCircleTexture(): THREE.Texture {
    console.log('Creating texture for points');
    const size = 32;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private addControls(): void {
    console.log('Adding orbit controls');
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;  
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    this.controls.zoomSpeed = 1.2;
  }

  private animate(): void {
    console.log('Starting animation loop');
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}