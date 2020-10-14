package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoProvince;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoProvince entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoProvinceRepository extends JpaRepository<RefGeoProvince, Long> {
}
