package com.example.polusServiceRequest.models;

import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "SR_TICKET_HISTORY")
public class SRTicketHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HISTORY_ID")
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "SR_TICKET_ID")
    private SRTicketsEntity srTicket;

    @ManyToOne
    @JoinColumn(name = "STATUS_CODE")
    private SRTicketStatusEntity statusCode;

    @ManyToOne
    @JoinColumn(name = "UPDATE_USER")
    private PersonEntity updateUser;

    @Column(name = "UPDATE_TIMESTAMP")
    private Timestamp updateTimestamp;

	
    
    

}