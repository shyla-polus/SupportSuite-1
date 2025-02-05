import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { TicketFetchPayLoad } from '../../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignedRequests',
  templateUrl: './assignedRequests.component.html',
  styleUrls: ['./assignedRequests.component.css']
})

export class AssignedRequestsComponent implements OnInit {

    allAssignedTickets: any = [];
    loggedInUser: any;
    pageNumber:number=0;
    allRequestCount: any ={}
    totalPages: number = 0;
  
    constructor(private _sharedService: SharedService, private _router: Router) { }
  
    ngOnInit() {
      this.checkUserAuthentication()
      this.loggedInUser = this._sharedService.getLoggedInUser(); 
      this.loadALLAssignedTickets(); 
      this.getAllRequestCount();
    }

    private checkUserAuthentication(): void {
        const isLoggedIn = !!this._sharedService.getLoggedInUser();
        if (!isLoggedIn) {
          this._router.navigate(['/login']);
        }
    }

    public pageNumberFun(page:number) {
        this.pageNumber=page;
        this.loadALLAssignedTickets();
    }

    private getAllRequestCount(): void{
        this._sharedService.getAllRequestCount().subscribe({
         next: (response: any) => {
             this.allRequestCount=response;
             const totalRequestCount = response.assignedRequests; 
             this.totalPages = Math.ceil(totalRequestCount / 10);
             this.loadALLAssignedTickets();
         },
         error: (err) => {
     
            }
        });
    }  

    private loadALLAssignedTickets() {
        const ticketFetchPayLoad: TicketFetchPayLoad = {
            personID: this.loggedInUser.personId,
            statusType: 2,
            pageNumber: this.pageNumber,
            pageSize: 10
        };
      
      this._sharedService.getAllServiceTicket(ticketFetchPayLoad).subscribe({
        next: (response: any) => {
          this.allAssignedTickets = response;
        },
        error: (err) => {
          console.error('Failed to fetch in-progress tickets', err);
        }
      });
    }
  
    public getTime(timestamp: string): string {
      const NOW = new Date();
      const PASTDATE = new Date(timestamp);
      const SECONDSAGO = Math.floor((NOW.getTime() - PASTDATE.getTime()) / 1000);
      const MINUTESAGO = Math.floor(SECONDSAGO / 60);
      const HOURSAGO = Math.floor(MINUTESAGO / 60);
      const DAYSAGO = Math.floor(HOURSAGO / 24);
      const WEEKSAGO = Math.floor(DAYSAGO / 7);
      const MONTHSAGO = Math.floor(DAYSAGO / 30);
      const YEARSAGO = Math.floor(DAYSAGO / 365);
      if (YEARSAGO > 0) {
          return YEARSAGO === 1 ? '1 year ago' : `${YEARSAGO} years ago`;
      } else if (MONTHSAGO > 0) {
          return MONTHSAGO === 1 ? '1 month ago' : `${MONTHSAGO} months ago`;
      } else if (WEEKSAGO > 0) {
          return WEEKSAGO === 1 ? '1 week ago' : `${WEEKSAGO} weeks ago`;
      } else if (DAYSAGO > 0) {
          return DAYSAGO === 1 ? '1 day ago' : `${DAYSAGO} days ago`;
      } else if (HOURSAGO > 0) {
          return HOURSAGO === 1 ? '1 hour ago' : `${HOURSAGO} hours ago`;
      } else if (MINUTESAGO > 0) {
          return MINUTESAGO === 1 ? '1 minute ago' : `${MINUTESAGO} minutes ago`;
      } else {
          return SECONDSAGO === 1 ? '1 second ago' : `${SECONDSAGO} seconds ago`;
      }
    }

    public getPagesArray(): number[] {
        return Array.from({ length: this.totalPages }, (_, i) => i);
    }
}