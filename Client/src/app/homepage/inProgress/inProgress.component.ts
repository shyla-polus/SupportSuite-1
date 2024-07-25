import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { Category } from './inpro-interface';
import { Admins } from '../../interface';
import { TicketFetchPayLoad } from '../../interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-inProgress',
    templateUrl: './inProgress.component.html',
    styleUrls: ['./inProgress.component.css']
})
export class InProgressComponent implements OnInit {



  inProgressTickets: any = [];
  loggedInUser: any;
  pageNumber:number=0;
  deleteTicketVariable:number=0;
  totalPages: number = 0;
  errorMap = new Map<string, string>();
  isResponseSent: boolean = true;
  categories: Category[] = [];
  administrator: Admins[] = [];
  allRequestCount: any ={};
  editReqObjPayload: any = {
    category: '',
    requestDescription: '',
    personId: null,
    ticketId: null
  };
  assignTicketObj: any = {
    ticketId: null,
    assignedTo: null
  };

  constructor(private _sharedService: SharedService, private _router: Router) { }

  ngOnInit() {
    this.checkUserAuthentication()
    this.loggedInUser = this._sharedService.getLoggedInUser();
    this.getCategories();
    this.loadInProgressTickets();
    this.getAdmin();
    this.getAllRequestCount();
  }


  private checkUserAuthentication(): void {
    const isLoggedIn = !!this._sharedService.getLoggedInUser();
    if (!isLoggedIn) {
      this._router.navigate(['/login']);
    }
  }

    private displayErrorMessage(key: string, value: string): void {
        this.errorMap.set(key, value);
        this.isResponseSent = false;
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
    public pageNumberFun(page:number) {
            this.pageNumber=page;
            this.loadInProgressTickets();

    }
    public loadInProgressTickets() {
    const ticketFetchPayLoad: TicketFetchPayLoad = {
        personID: this.loggedInUser.personId,
        statusType: 1,
        pageNumber: this.pageNumber,
        pageSize: 10
    };

    this._sharedService.getAllServiceTicket(ticketFetchPayLoad).subscribe({
        next: (response: any) => {
        this.inProgressTickets = response;
        },
        error: (err) => {
        console.error('Failed to fetch in-progress tickets', err);
        }
    });
    }

    private getAllRequestCount(): void{
    this._sharedService.getAllRequestCount().subscribe({
        next: (response: any) => {
            this.allRequestCount=response;
            const totalRequestCount = response.assignedRequests; 
            this.totalPages = Math.ceil(totalRequestCount / 10);
            this.loadInProgressTickets();
        },
        error: (err) => {
    
        }
    });
    }
    
      private getCategories(): void {
        this._sharedService.getCategories().subscribe({
          next: (data: Category[]) => {
            this.categories = data;
          },
          error: (err) => {
            console.error('Failed to fetch categories', err);
          }
        });
      }
    
      private getAdmin(): void {
        this._sharedService.getAdmin().subscribe({
          next: (data: Admins[]) => {
            this.administrator = data;
          },
          error: (err) => {
            console.error('Failed to fetch admins', err);
          }
        });
      }
    
      public currentTicket(ticket: any): void {
        this.assignTicketObj.ticketId = ticket.ticketId;
        this.editReqObjPayload = {
          requestDescription: ticket.requestDescription,
          ticketId: ticket.ticketId,
          personId: this.loggedInUser.personId,
          category: ticket.category.categoryCode
        };
      }
    
      public saveChanges(): void {
        if (!this.editReqObjPayload.requestDescription) {
          this.displayErrorMessage('descriptionErrorMessage', 'Please provide a description to continue.');
          return;
        }
        if (!this.editReqObjPayload.requestDescription.trim()) {
            Swal.fire({
              icon: 'warning',
              title: 'Empty Field',
              text: 'Please do not leave the description field empty.',
              confirmButtonText: 'OK'
            });
            return; 
          }
    
        this._sharedService.makeServiceRequest(this.editReqObjPayload).subscribe({
          next: (response: any) => {
            this.loadInProgressTickets();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Edited",
                showConfirmButton: false,
                timer: 2000
              });
            return; 
          },
          error: (err) => {
            console.error('Failed to update ticket', err);
          }
        });
      }


      public setDeleteTicket(ticketId: number){
          this.deleteTicketVariable=ticketId;
      }
    
      public deleteTicket(): void {
        this._sharedService.deleteInProgress(this.deleteTicketVariable).subscribe({
          next: (response: any) => {
            this.loadInProgressTickets();
          },
          error: (err) => {
            console.error('Failed to delete ticket', err);
          }
        });
      }
    
      public assignTicket(): void {
        this._sharedService.assignTicket(this.assignTicketObj).subscribe({
          next: (response: any) => {
            this.loadInProgressTickets();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Request is assigned to Administrator",
                showConfirmButton: false,
                timer: 2000
              });
          }
        });
      }

    public getPagesArray(): number[] {
        return Array.from({ length: this.totalPages }, (_, i) => i);
    }
}
