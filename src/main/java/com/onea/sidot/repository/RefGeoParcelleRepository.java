package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoParcelle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoParcelle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoParcelleRepository extends JpaRepository<RefGeoParcelle, Long> {
}
