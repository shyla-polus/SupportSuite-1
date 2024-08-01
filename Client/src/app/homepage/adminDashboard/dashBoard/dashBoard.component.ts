import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { TicketFetchPayLoad } from '../../../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashBoard',
  templateUrl: './dashBoard.component.html',
  styleUrls: ['./dashBoard.component.css']
})
export class DashBoardComponent implements OnInit {

   @Output() countEvent: EventEmitter<any> = new EventEmitter();


  showRejectMessage: boolean = false;
  showApproveMessage: boolean = false;
  loggedInUser: any;
  pageNumber:number=0;
  totalPages: number = 0;
  allRequestCount: any ={}
  allAssignedTickets: any = [];
  TicketApproveOrRejectDTO: any={
    statusCode:null,
    comment:'',
    ticketId:null
  }

  constructor(private _sharedService:SharedService , private _router: Router) { }

  ngOnInit() {
    this.checkUserAuthentication()
    this.loggedInUser = this._sharedService.getLoggedInUser();
    this.getAllRequestCount()
    this.getAllAssignedToMe()
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
  }

    public pageNumberFun(page:number) {
        this.pageNumber=page;
        this.getAllAssignedToMe();
    }

    private getAllRequestCount(): void{
        this._sharedService.getAllRequestCount().subscribe({
         next: (response: any) => {
             this.allRequestCount=response;
             const totalRequestCount = response.assignedToMeRequests; 
             this.totalPages = Math.ceil(totalRequestCount / 10);
             this.getAllAssignedToMe();
         },
         error: (err) => {
     
            }
        });
    }


  public getAllAssignedToMe(): void{

    const assignedToMePayLoad: TicketFetchPayLoad = {
        personID: this.loggedInUser.personId,
        statusType: 2,
        pageNumber: this.pageNumber,
        pageSize: 10
    };
    this._sharedService.getAllAssignedToMe(assignedToMePayLoad).subscribe({
        next: (response: any) => {
          this.allAssignedTickets = response;
        },
        error: (err) => {
          console.error('Failed to fetch tickets', err);
        }
      });
    }

    public currentTicket(ticket: any): void {
        this.TicketApproveOrRejectDTO.ticketId = ticket;
        this.showRejectMessage=false;
        this.showApproveMessage=false;
    }


    public isApproveReject(status:number): void{
        this.TicketApproveOrRejectDTO.statusCode=status;
        this._sharedService.statusChangeToApprovedOrRejected(this.TicketApproveOrRejectDTO).subscribe({
            next: (response: any) => {
                this.getAllAssignedToMe();
                this.setComment();
                this.countEvent.emit('check count');
                this.showRejectMessage=false;
                this.showApproveMessage=false;
            },
            error: (err) => {
              console.error('Failed to fetch tickets', err);
            }
          });

        
    }


    public toggleApproveMessage() {
        this.showApproveMessage = !this.showApproveMessage;
        this.showRejectMessage = false;
      }


    public toggleRejectMessage() {
    this.showRejectMessage = !this.showRejectMessage;
    this.showApproveMessage=false;
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

      public setComment(){
        this.TicketApproveOrRejectDTO.comment='';
      }
  
      public getPagesArray(): number[] {
          return Array.from({ length: this.totalPages }, (_, i) => i);
      }

}
