package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoSection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoSection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoSectionRepository extends JpaRepository<RefGeoSection, Long> {
}
