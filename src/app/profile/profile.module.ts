import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // Ensure Ionic components are available
    RouterModule.forChild([{ path: '', component: ProfileComponent }])  // Setup routing
  ]
})
export class ProfileModule {}
