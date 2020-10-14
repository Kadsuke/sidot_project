package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoParcelle;
import com.onea.sidot.repository.RefGeoParcelleRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoParcelle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoParcelleResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoParcelleResource.class);

    private static final String ENTITY_NAME = "refGeoParcelle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoParcelleRepository refGeoParcelleRepository;

    public RefGeoParcelleResource(RefGeoParcelleRepository refGeoParcelleRepository) {
        this.refGeoParcelleRepository = refGeoParcelleRepository;
    }

    /**
     * {@code POST  /ref-geo-parcelles} : Create a new refGeoParcelle.
     *
     * @param refGeoParcelle the refGeoParcelle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoParcelle, or with status {@code 400 (Bad Request)} if the refGeoParcelle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-parcelles")
    public ResponseEntity<RefGeoParcelle> createRefGeoParcelle(@RequestBody RefGeoParcelle refGeoParcelle) throws URISyntaxException {
        log.debug("REST request to save RefGeoParcelle : {}", refGeoParcelle);
        if (refGeoParcelle.getId() != null) {
            throw new BadRequestAlertException("A new refGeoParcelle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoParcelle result = refGeoParcelleRepository.save(refGeoParcelle);
        return ResponseEntity.created(new URI("/api/ref-geo-parcelles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-parcelles} : Updates an existing refGeoParcelle.
     *
     * @param refGeoParcelle the refGeoParcelle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoParcelle,
     * or with status {@code 400 (Bad Request)} if the refGeoParcelle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoParcelle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-parcelles")
    public ResponseEntity<RefGeoParcelle> updateRefGeoParcelle(@RequestBody RefGeoParcelle refGeoParcelle) throws URISyntaxException {
        log.debug("REST request to update RefGeoParcelle : {}", refGeoParcelle);
        if (refGeoParcelle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoParcelle result = refGeoParcelleRepository.save(refGeoParcelle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoParcelle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-parcelles} : get all the refGeoParcelles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoParcelles in body.
     */
    @GetMapping("/ref-geo-parcelles")
    public ResponseEntity<List<RefGeoParcelle>> getAllRefGeoParcelles(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoParcelles");
        Page<RefGeoParcelle> page = refGeoParcelleRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-parcelles/:id} : get the "id" refGeoParcelle.
     *
     * @param id the id of the refGeoParcelle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoParcelle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-parcelles/{id}")
    public ResponseEntity<RefGeoParcelle> getRefGeoParcelle(@PathVariable Long id) {
        log.debug("REST request to get RefGeoParcelle : {}", id);
        Optional<RefGeoParcelle> refGeoParcelle = refGeoParcelleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoParcelle);
    }

    /**
     * {@code DELETE  /ref-geo-parcelles/:id} : delete the "id" refGeoParcelle.
     *
     * @param id the id of the refGeoParcelle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-parcelles/{id}")
    public ResponseEntity<Void> deleteRefGeoParcelle(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoParcelle : {}", id);
        refGeoParcelleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
