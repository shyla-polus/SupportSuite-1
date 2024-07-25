import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { MakeServiceRequestComponent} from './homepage/makeServiceRequest/makeServiceRequest.component';
import { UserprofileComponent } from './homepage/userprofile/userprofile.component';
import { InProgressComponent } from './homepage/inProgress/inProgress.component';
import { AssignedRequestsComponent } from './homepage/assignedRequests/assignedRequests.component';
import { IndexPageComponent } from './homepage/indexPage/indexPage.component';
import { AdminDashboardComponent } from './homepage/adminDashboard/adminDashboard.component';
import { AllRequestsComponent } from './homepage/allRequests/allRequests.component';
import { ApprovedRequestComponent } from './homepage/approvedRequest/approvedRequest.component';
import { RejectedRequestComponent } from './homepage/rejectedRequest/rejectedRequest.component';
import { DashBoardComponent } from './homepage/adminDashboard/dashBoard/dashBoard.component';
import { AddServiceComponent } from './homepage/adminDashboard/addService/addService.component';
import { NewAdminComponent } from './homepage/adminDashboard/newAdmin/newAdmin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    ErrorComponent,
    MakeServiceRequestComponent,
    UserprofileComponent,
    InProgressComponent,
    AssignedRequestsComponent,
    IndexPageComponent,
    AdminDashboardComponent,
    AllRequestsComponent,
    ApprovedRequestComponent,
    RejectedRequestComponent,
    NewAdminComponent,
    AddServiceComponent,
    DashBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIf
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
