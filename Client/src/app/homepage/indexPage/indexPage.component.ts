import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexPage',
  templateUrl: './indexPage.component.html',
  styleUrls: ['./indexPage.component.css']
})

export class IndexPageComponent implements OnInit {

  allRequestCount: any ={}

  constructor(private _sharedService : SharedService, private _router: Router) { }

  ngOnInit() {
    this.checkUserAuthentication()
    this.getAllRequestCount();
  }

  private checkUserAuthentication(): void {
    const isLoggedIn = !!this._sharedService.getLoggedInUser();
    if (!isLoggedIn) {
      this._router.navigate(['/login']);
    }
  }

  public goToMakeServiceRequest() {
    this._router.navigate(['homepage/makeReq']);
  }

  private getAllRequestCount(): void{
   this._sharedService.getAllRequestCount().subscribe({
    next: (response: any) => {
        this.allRequestCount=response;
    },
    error: (err) => {

        }
       });
    }
    public scrollToElement(elementId: string) {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
}
