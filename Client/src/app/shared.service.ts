import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InproInterface } from './homepage/inProgress/inpro-interface';
import { Ticket, StatusDescription, Category, Admins, Country } from './interface';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})


export class SharedService {
    private loggedInUser: any;
    private inProgressUser: any;

    constructor(private _http: HttpClient, private _router: Router) { }

    login(loginPayload: any): Observable<any> {
        return this._http.post<any>(`/log`, loginPayload);
    }

    signup(signupPayload: any): Observable<any> {
        return this._http.post<any>(`/sign`, signupPayload);
    }

    makeServiceRequest(makeServiceRequest: any): Observable<any> {
        return this._http.post<any>(`/makeServiceRequest`, makeServiceRequest);
    }

    deleteInProgress(deleteTicketId: number): Observable<any> {
        return this._http.delete<any>(`/deleteTicket/${deleteTicketId}`);
    }

    getCountries(): Observable<Country[]> {
        return this._http.get<Country[]>(`/count`);
    }

    getCategories(): Observable<Category[]> {
        return this._http.get<Category[]>('/service');
    }


    getAdmin(): Observable<Admins[]> {
        return this._http.get<Admins[]>('/getAllAdmins');
    }

    setLoggedInUser(user: any): void {
        this.loggedInUser = user;
    }

    getLoggedInUser(): any {
        return this.loggedInUser;
    }

    setInProgress(user: any): void {
        this.inProgressUser = user;
    }

    getInProgress(): any {
        return this.inProgressUser;
    }

    getAllServiceTicket(ticketFetchPayLoad:any): Observable<InproInterface> {
        return this._http.post<InproInterface>(`/getAllIn-progressTickets`,ticketFetchPayLoad);
    }

    assignTicket(assignPayLoad: any): Observable<any> {
        return this._http.post<any>(`assignTicket`,assignPayLoad)
    }

    getAllRequestCount() : Observable<InproInterface> {
        return this._http.get<InproInterface>(`/getAllRequestCount/${this.loggedInUser.personId}`);
    }

    getAllTickets() : Observable<InproInterface> {
        return this._http.get<InproInterface>(`/getAllTickets/${this.loggedInUser.personId}`);
    }

    clearUserSession() {
        this.loggedInUser = null;
    }

    getAllAssignedToMe(approvedticketFetchPayLoad:any) : Observable<InproInterface>{
        return this._http.post<InproInterface>(`/getAllAssignedToMeTickets`,approvedticketFetchPayLoad);
    }

}
