import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
 user:any;
  constructor(private authService: AuthService,private router: Router) {}

   ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe(user => {
        this.user = user?.displayName
      })
  }
  logOut(){
    this.authService.logout().then(r =>
      this.router.navigate(['/login'])
    );
  }
}
