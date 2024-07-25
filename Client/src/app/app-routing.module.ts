import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { AssignedRequestsComponent } from './homepage/assignedRequests/assignedRequests.component';
import { InProgressComponent } from './homepage/inProgress/inProgress.component';
import { UserprofileComponent } from './homepage/userprofile/userprofile.component';
import { MakeServiceRequestComponent } from './homepage/makeServiceRequest/makeServiceRequest.component';
import { AdminDashboardComponent } from './homepage/adminDashboard/adminDashboard.component';
import { IndexPageComponent } from './homepage/indexPage/indexPage.component';
import { AllRequestsComponent } from './homepage/allRequests/allRequests.component';
import { ApprovedRequestComponent } from './homepage/approvedRequest/approvedRequest.component';
import { RejectedRequestComponent } from './homepage/rejectedRequest/rejectedRequest.component';
import { DashBoardComponent } from './homepage/adminDashboard/dashBoard/dashBoard.component';
import { NewAdminComponent } from './homepage/adminDashboard/newAdmin/newAdmin.component';
import { AddServiceComponent } from './homepage/adminDashboard/addService/addService.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'homepage', component: HomepageComponent,
        children: [
            { path: 'userPro', component: UserprofileComponent },
            { path: 'makeReq', component: MakeServiceRequestComponent },
            { path: 'inPro', component: InProgressComponent },
            { path: 'assignedReq', component: AssignedRequestsComponent },
            { path:'AdminDashboard', component: AdminDashboardComponent,
                children: [
                    {path: 'dashboard', component: DashBoardComponent},
                    {path:'newAdmin',component: NewAdminComponent},
                    {path:'addService',component: AddServiceComponent}
                ]
            },
            { path:'indexPage', component: IndexPageComponent},
            { path:'AllRequests', component: AllRequestsComponent},
            {path:'approvedRequests', component:ApprovedRequestComponent },
            {path:'rejectedRequests', component:RejectedRequestComponent }
        ]
    },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true }),],
    exports: [RouterModule]
})
export class AppRoutingModule { }
