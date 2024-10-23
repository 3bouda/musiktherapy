import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../auth/service/auth.service";
import { userData } from "./userData.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: userData = {};
  @ViewChild('fileInput') fileInput!: ElementRef;  // Reference to the hidden file input

  constructor(private authService: AuthService) { }

  async updateProfile() {
    try {
      // Call updateProfile with the current user data and optional file
      await this.authService.updateProfile(this.currentUser, this.selectedFile);
    } catch (error) {
      console.error('updateProfile error', error);
    }
  }

  async ngOnInit() {
    try {
      const profileData = await this.authService.getProfile() as userData; // Fetch user profile data
      if (profileData) {
        this.currentUser = {
          email: profileData.email,
          name: profileData.name,
          lastName: profileData.lastName,
          imagePath: profileData.imagePath || ''
        };
      }
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  }

  // Method to trigger file input on avatar click
  selectImage() {
    this.fileInput.nativeElement.click(); // Trigger the file input click
  }

  selectedFile: File | null = null; // Variable to store the selected file

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    // Check if the input and files exist
    if (input && input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // Store the selected file
    } else {
      console.error("No file selected or input is null");
    }
  }
}
