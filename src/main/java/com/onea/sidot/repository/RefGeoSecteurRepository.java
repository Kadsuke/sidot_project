package com.onea.sidot.repository;

import com.onea.sidot.domain.RefGeoSecteur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RefGeoSecteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefGeoSecteurRepository extends JpaRepository<RefGeoSecteur, Long> {
}
