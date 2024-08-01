export interface LoginObj {
  userName: string;
  password: string;
}

export interface Country {
    countryCode: string;
    countryName: string;
    currencyCode: string;
    updateTimestamp: Date;
    updateUser: string;
    countryCodeIso2: string;
}



export interface Admins{
  personId: string,
  name: string
}


export interface Users{
     adminID:number,
     personId:number,
     role:number
}


export interface TicketFetchPayLoad{
    personID:number,
    statusType:number,
    pageNumber:number,
    pageSize:number
}
  
 export  interface Role {
    roleId: number;
    roleName: string;
    roleDescription: string;
  }
  
 export interface User {
    personId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    country: Country;
    phoneNumber: string;
    address: string;
    createdDate: string;
    updatedDate: string;
    roles: Role[];
  }
  
export interface RequestCount {
    totalRequests: number;
    inProgressRequests: number;
    assignedRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    assignedToMeRequests: number;
    adminApproveRequests: number;
    adminRejectRequests: number;
}