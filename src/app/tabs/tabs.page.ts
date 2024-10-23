import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/service/auth.service";
import {Router} from "@angular/router";
import {ProfileComponent} from "../profile/profile.component";
import {userData} from "../profile/userData.interface";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  currentUser: userData={};
  component = ProfileComponent;
  constructor(private authService: AuthService,private router: Router) {}

   async ngOnInit() {
     try {
       const profileData = await this.authService.getProfile() as userData;
       if (profileData) {
         this.currentUser = {
           email: profileData.email,
           name: profileData.name,
           lastName: profileData.lastName
         };
       }
     } catch (error) {
       console.error('Error fetching profile data', error);
     }
   }
  logOut(){
    this.authService.logout().then(r =>
      this.router.navigate(['/login'])
    );
  }
  navProfile(){
    this.router.navigate(['/profile'])

  }

}
