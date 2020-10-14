package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoLocalite;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoLocalite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoLocaliteRepository extends JpaRepository<RefGeoLocalite, Long> {
}
