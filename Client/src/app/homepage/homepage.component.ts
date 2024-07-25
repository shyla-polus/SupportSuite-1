import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  isDropdownVisible: boolean = false;

  constructor(private _router: Router, private _sharedService: SharedService) {}
  
  ngOnInit() {
     this.checkUserAuthentication()
  }


  private checkUserAuthentication(): void {
    const isLoggedIn = !!this._sharedService.getLoggedInUser();
    if (!isLoggedIn) {
      this._router.navigate(['/login']);
    }
  }

  public toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  public userProfile(event: Event): void {
    event.preventDefault();
    this._router.navigate(['/homepage/userPro']);
  }
  
  public logout(event: Event): void {
    event.preventDefault();
    this._sharedService.clearUserSession();
    this._router.navigate(['/login']);
  }

}
