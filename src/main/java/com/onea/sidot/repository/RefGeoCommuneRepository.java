package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoCommune;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoCommune entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoCommuneRepository extends JpaRepository<RefGeoCommune, Long> {
}
