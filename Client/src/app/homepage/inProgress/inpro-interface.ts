export interface TicketInterface {
    ticketId: number;
    category: {
        categoryCode: number;
        categoryName: string;
        description: string;
    };
    requestDescription: string;
    statusDescription: {
        statusCode: number;
        status: string;
    };
    assignedTo: {
        personId: number;
        name: string;
        roles: {
            roleId: number;
            roleName: string;
            roleDescription: string;
        }[];
    } | null;
    createTimestamp: string;
    updateTimestamp: string;
    comment: {
        commentId: number;
        commentUser: {
            personId: number;
            name: string;
            roles: {
                roleId: number;
                roleName: string;
                roleDescription: string;
            }[];
        };
        status: {
            statusCode: number;
            status: string;
        };
        commentTimestamp: string;
        comment: string;
    }[] | null;
}

