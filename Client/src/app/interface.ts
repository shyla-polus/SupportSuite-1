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

export interface Category {
  categoryCode: string;
  categoryName: string;
  description: string;
}

export interface Admins{
  personId: string,
  name: string
}

export interface StatusDescription {
  statusCode: string;
  statusDescription: string;
}

export interface Ticket {
  ticketId: number;
  category: Category | null;
  requestDescription: string;
  statusDescription: StatusDescription | null;
  assignedTo: string | null;
  createTimestamp: string;
  updateTimestamp: string;
}

export interface TicketFetchPayLoad{
    personID:number,
    statusType:number,
    pageNumber:number,
    pageSize:number
}

