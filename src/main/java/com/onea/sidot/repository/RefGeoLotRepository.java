package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoLot;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoLot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoLotRepository extends JpaRepository<RefGeoLot, Long> {
}
