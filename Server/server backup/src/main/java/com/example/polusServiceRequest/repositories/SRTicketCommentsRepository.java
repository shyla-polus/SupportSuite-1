package com.example.polusServiceRequest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.polusServiceRequest.models.SRTicketCommentsEntity;

public interface SRTicketCommentsRepository extends JpaRepository<SRTicketCommentsEntity, Long> {

	@Query(value = "SELECT * FROM SR_TICKET_COMMENTS WHERE SR_TICKET_ID = :srTicketId", nativeQuery = true)
    List<SRTicketCommentsEntity> findAllByTicketId(@Param("srTicketId") Long srTicketId);

}
