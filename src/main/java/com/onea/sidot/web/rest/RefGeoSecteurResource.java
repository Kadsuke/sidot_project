package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoSecteur;
import com.onea.sidot.repository.RefGeoSecteurRepository;
import com.onea.sidot.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoSecteur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoSecteurResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoSecteurResource.class);

    private static final String ENTITY_NAME = "refGeoSecteur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoSecteurRepository refGeoSecteurRepository;

    public RefGeoSecteurResource(RefGeoSecteurRepository refGeoSecteurRepository) {
        this.refGeoSecteurRepository = refGeoSecteurRepository;
    }

    /**
     * {@code POST  /ref-geo-secteurs} : Create a new refGeoSecteur.
     *
     * @param refGeoSecteur the refGeoSecteur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoSecteur, or with status {@code 400 (Bad Request)} if the refGeoSecteur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-secteurs")
    public ResponseEntity<RefGeoSecteur> createRefGeoSecteur(@RequestBody RefGeoSecteur refGeoSecteur) throws URISyntaxException {
        log.debug("REST request to save RefGeoSecteur : {}", refGeoSecteur);
        if (refGeoSecteur.getId() != null) {
            throw new BadRequestAlertException("A new refGeoSecteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoSecteur result = refGeoSecteurRepository.save(refGeoSecteur);
        return ResponseEntity.created(new URI("/api/ref-geo-secteurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-secteurs} : Updates an existing refGeoSecteur.
     *
     * @param refGeoSecteur the refGeoSecteur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoSecteur,
     * or with status {@code 400 (Bad Request)} if the refGeoSecteur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoSecteur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-secteurs")
    public ResponseEntity<RefGeoSecteur> updateRefGeoSecteur(@RequestBody RefGeoSecteur refGeoSecteur) throws URISyntaxException {
        log.debug("REST request to update RefGeoSecteur : {}", refGeoSecteur);
        if (refGeoSecteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoSecteur result = refGeoSecteurRepository.save(refGeoSecteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoSecteur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-secteurs} : get all the refGeoSecteurs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoSecteurs in body.
     */
    @GetMapping("/ref-geo-secteurs")
    public ResponseEntity<List<RefGeoSecteur>> getAllRefGeoSecteurs(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoSecteurs");
        Page<RefGeoSecteur> page = refGeoSecteurRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-secteurs/:id} : get the "id" refGeoSecteur.
     *
     * @param id the id of the refGeoSecteur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoSecteur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-secteurs/{id}")
    public ResponseEntity<RefGeoSecteur> getRefGeoSecteur(@PathVariable Long id) {
        log.debug("REST request to get RefGeoSecteur : {}", id);
        Optional<RefGeoSecteur> refGeoSecteur = refGeoSecteurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoSecteur);
    }

    /**
     * {@code DELETE  /ref-geo-secteurs/:id} : delete the "id" refGeoSecteur.
     *
     * @param id the id of the refGeoSecteur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-secteurs/{id}")
    public ResponseEntity<Void> deleteRefGeoSecteur(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoSecteur : {}", id);
        refGeoSecteurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
