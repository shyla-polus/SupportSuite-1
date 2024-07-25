import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-allRequests',
  templateUrl: './allRequests.component.html',
  styleUrls: ['./allRequests.component.css']
})

export class AllRequestsComponent implements OnInit {

    AllTickets: any = [];
    
    constructor(private _sharedService: SharedService, 
                private _router: Router) { }

    ngOnInit() {
        this.checkUserAuthentication();
        this.loadAllTickets();
    }

    private checkUserAuthentication(): void {
        const isLoggedIn = !!this._sharedService.getLoggedInUser();
        if (!isLoggedIn) {
            this._router.navigate(['/login']);
        }
    }

    public loadAllTickets() {
        this._sharedService.getAllTickets().subscribe({
            next: (response: any) => {
                this.AllTickets = response;
                console.log(response);
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
