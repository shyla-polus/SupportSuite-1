import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import {newServicePayLoad} from './addService.interface'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addService',
  templateUrl: './addService.component.html',
  styleUrls: ['./addService.component.css']
})
export class AddServiceComponent implements OnInit {


   loggedInUser: any; 
   newServicePayLoad: newServicePayLoad ={
    description:'',
    categoryName:'',
    adminId:0
   }

  constructor(private _sharedService:SharedService, private _router:Router) { }

  ngOnInit() {
    this.checkUserAuthentication()
    this.loggedInUser = this._sharedService.getLoggedInUser();
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
  }

  public createNewServiceCategory(): void{
    this.newServicePayLoad.adminId=this.loggedInUser.personId;
    this._sharedService.createNewServiceCategory(this.newServicePayLoad).subscribe({
        next: (response:any)=>{
            this.newServicePayLoad.description=''; 
            this.newServicePayLoad.categoryName='';
            Swal.fire({
                position: "center",
                icon: "success",
                title: "New admin assigned",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: (err)=>{
            
        }
    })
  }
}
