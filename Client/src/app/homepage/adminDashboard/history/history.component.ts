import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { TicketFetchPayLoad } from '../../../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  allApprovedTickets: any = [];
  allRejectedTickets: any = [];
  loggedInUser: any;
  pageNumber:number=0;

  constructor(private _sharedService:SharedService , private _router: Router) { }

  ngOnInit() {
    this.checkUserAuthentication()
    this.loggedInUser = this._sharedService.getLoggedInUser();
    this.getAllApprovedTickets();
    this.getAllRejectedTickets();
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
  }

  public getAllApprovedTickets(): void{

    const assignedToMePayLoad: TicketFetchPayLoad = {
        personID: this.loggedInUser.personId,
        statusType: 3,
        pageNumber: this.pageNumber,
        pageSize: 10
    };
    this._sharedService.getAllAssignedToMe(assignedToMePayLoad).subscribe({
        next: (response: any) => {
          this.allApprovedTickets = response;
        },
        error: (err) => {
          console.error('Failed to fetch tickets', err);
        }
      });
    }

    public getAllRejectedTickets(): void{

        const assignedToMePayLoad: TicketFetchPayLoad = {
            personID: this.loggedInUser.personId,
            statusType: 4,
            pageNumber: this.pageNumber,
            pageSize: 10
        };
        this._sharedService.getAllAssignedToMe(assignedToMePayLoad).subscribe({
            next: (response: any) => {
              this.allRejectedTickets = response;
            },
            error: (err) => {
              console.error('Failed to fetch tickets', err);
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


}
