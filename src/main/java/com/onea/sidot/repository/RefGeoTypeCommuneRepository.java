package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoTypeCommune;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoTypeCommune entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoTypeCommuneRepository extends JpaRepository<RefGeoTypeCommune, Long> {
}
