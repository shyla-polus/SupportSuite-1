import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { Router } from '@angular/router';
import { Admins,Users } from '../../../interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newAdmin',
  templateUrl: './newAdmin.component.html',
  styleUrls: ['./newAdmin.component.css']
})
export class NewAdminComponent implements OnInit {
  
  allAdmins:any;
  allAdministrator:Admins[]=[];
  allUsers: Admins[] = [];
  loggedInUser: any;
  makeAdminPayload: any={
    adminID:null,
    role:1,
    personId:null
  }
  revokeAdminPayload: any={
    adminID:null,
    role:1,
    personId:null
  }

  constructor(private _sharedService:SharedService , private _router:Router) {}

  ngOnInit() {
    this.checkUserAuthentication();
    this.loggedInUser = this._sharedService.getLoggedInUser();
    this.getAllUsers();
    this.getAllAdmin();
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
  }

  public getAllUsers() : void {
    this._sharedService.getUsers().subscribe({
        next: (data: Admins[]) => {
            this.allUsers = data;
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
        }
      });
  }

  public makeAdmin() : void{
    this.makeAdminPayload.adminID=this.loggedInUser.personId;
    this._sharedService.makeNewAdmin(this.makeAdminPayload).subscribe({
        next: (any) => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Assigned admin privileges",
                showConfirmButton: false,
                timer: 1500
            });
            this.getAllUsers();
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
        }
    });
  }

  private getAllAdmin(): void {
    this._sharedService.getAdmin().subscribe({
    next: (data) => {
    this.allAdministrator = data;
    },
    error: (err) => {
    console.error('Failed to fetch admins', err);
    }
      });
    }

  public revokeAdmin() : void{
    this.revokeAdminPayload.adminID=this.loggedInUser.personId;
    this._sharedService.revokeAdmin(this.revokeAdminPayload).subscribe({
        next: (any) => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Revoke Admin privileges",
                showConfirmButton: false,
                timer: 1500
            });
            this.getAllAdmin();
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
        }
    });
  }



}
