package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoRegion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoRegion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoRegionRepository extends JpaRepository<RefGeoRegion, Long> {
}
