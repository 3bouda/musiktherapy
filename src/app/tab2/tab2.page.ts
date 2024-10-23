import {Component, OnInit} from '@angular/core';
import {MusicService} from "../musicService/music.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  selectedFile: File | null = null;
  musicList: string[] = [];
  constructor(private musicService:MusicService) {}
  ngOnInit(): void {
    this.getLibrary()
  }
  getLibrary(){
    this.musicService.getUserMusic().subscribe({
      next: (audioPaths) => {
        this.musicList = audioPaths;
      },
      error: (error) => {
        console.error('Error fetching user music:', error);
      }
    });
  }
  uploadMusic()  {
    if (this.selectedFile) {
      this.musicService.uploadFile(this.selectedFile).subscribe({
        next: (downloadURL) => {
          console.log('File available at', downloadURL);
        },
        error: (error) => {
          console.error('Upload failed', error);
        }
      });
    }
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }
}
