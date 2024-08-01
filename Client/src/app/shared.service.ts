import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketInterface } from './homepage/inProgress/inpro-interface';
import { Category } from './homepage/homePageInterface';
import {  Admins, Country, User, RequestCount } from './interface';


@Injectable({
    providedIn: 'root'
})


export class SharedService {
    private loggedInUser: any;
    private inProgressUser: any;

    constructor(private _http: HttpClient) { }

    login(loginPayload: any): Observable<User> {
        return this._http.post<User>(`/log`, loginPayload);
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

    getUsers(): Observable<Admins[]> {
        return this._http.get<Admins[]>('/getAllUsers');
    }

    setLoggedInUser(user: any): void {
        this.loggedInUser = user;
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    }
    
    getLoggedInUser(): any {
    if (this.loggedInUser) {
        return this.loggedInUser;
    }
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
        this.loggedInUser = JSON.parse(user);
        return this.loggedInUser;
    }
    return null;
    }

    setInProgress(user: any): void {
        this.inProgressUser = user;
    }

    getInProgress(): any {
        return this.inProgressUser;
    }

    getAllServiceTicket(ticketFetchPayLoad:any): Observable<TicketInterface> {
        return this._http.post<TicketInterface>(`/getTicketsBasedOnStatus`,ticketFetchPayLoad);
    }

    assignTicket(assignPayLoad: any): Observable<any> {
        return this._http.post<any>(`assignTicket`,assignPayLoad)
    }

    getAllRequestCount() : Observable<RequestCount> {
        return this._http.get<RequestCount>(`/getAllRequestCount/${this.loggedInUser.personId}`);
    }

    getAllTickets() : Observable<TicketInterface> {
        return this._http.get<TicketInterface>(`/getAllTickets/${this.loggedInUser.personId}`);
    }


    getAllAssignedToMe(approvedticketFetchPayLoad:any) : Observable<TicketInterface>{
        return this._http.post<TicketInterface>(`/getAllAssignedToMeTickets`,approvedticketFetchPayLoad);
    }

    statusChangeToApprovedOrRejected(ApprovedOrRejectedPayLoad:any) : Observable<any>{
        return this._http.post<any>(`/statusChangeToApprovedOrRejected`,ApprovedOrRejectedPayLoad);
    }

    makeNewAdmin(newAdminPayLoad:any): Observable<any>{
        return this._http.post<any>(`/makeAdmin`,newAdminPayLoad);
    }

    revokeAdmin(revokeAdminPayload:any): Observable<any>{
        return this._http.post<any>(`/removeAdmin`,revokeAdminPayload);
    }

    createNewServiceCategory(newServicePayLoad:any): Observable<any>{
        return this._http.post<any>(`/createNewServiceCategory`,newServicePayLoad);
    }


    clearUserSession(): void {
        this.loggedInUser = null;
        sessionStorage.removeItem('loggedInUser');
        
    }
}
