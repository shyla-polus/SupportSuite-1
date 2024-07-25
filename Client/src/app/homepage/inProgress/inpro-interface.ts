export interface InproInterface {
    ticketId: number;
    category: {
        categoryCode: string;
        categoryName: string;
        description: string;
    };
    requestDescription: string;
    statusDescription: {
        statusCode: string;
        statusDescription: string;
    };
    assignedTo: string | null;
    createTimestamp: string;
    updateTimestamp: string;

}


export interface Category {
    categoryCode: string;
    categoryName: string;
    description: string;
}