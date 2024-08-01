export interface EditReqObjPayload {
    category: string,
    requestDescription: string,
    personId: number,
    ticketId: number
};

export interface Category {
    categoryCode: string;
    categoryName: string;
    description: string;
}


export interface StatusDescription {
    statusCode: string;
    status: string;
}
  
export interface Ticket {
    ticketId: number;
    category: Category | null;
    requestDescription: string;
    statusDescription: StatusDescription | null;
    assignedTo: string | null;
    createTimestamp: string;
    updateTimestamp: string;
    comment: string | null;
}
  
