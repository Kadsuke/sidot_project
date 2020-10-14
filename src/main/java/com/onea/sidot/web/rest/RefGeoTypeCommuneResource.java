package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoTypeCommune;
import com.onea.sidot.repository.RefGeoTypeCommuneRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoTypeCommune}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoTypeCommuneResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoTypeCommuneResource.class);

    private static final String ENTITY_NAME = "refGeoTypeCommune";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoTypeCommuneRepository refGeoTypeCommuneRepository;

    public RefGeoTypeCommuneResource(RefGeoTypeCommuneRepository refGeoTypeCommuneRepository) {
        this.refGeoTypeCommuneRepository = refGeoTypeCommuneRepository;
    }

    /**
     * {@code POST  /ref-geo-type-communes} : Create a new refGeoTypeCommune.
     *
     * @param refGeoTypeCommune the refGeoTypeCommune to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoTypeCommune, or with status {@code 400 (Bad Request)} if the refGeoTypeCommune has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-type-communes")
    public ResponseEntity<RefGeoTypeCommune> createRefGeoTypeCommune(@RequestBody RefGeoTypeCommune refGeoTypeCommune) throws URISyntaxException {
        log.debug("REST request to save RefGeoTypeCommune : {}", refGeoTypeCommune);
        if (refGeoTypeCommune.getId() != null) {
            throw new BadRequestAlertException("A new refGeoTypeCommune cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoTypeCommune result = refGeoTypeCommuneRepository.save(refGeoTypeCommune);
        return ResponseEntity.created(new URI("/api/ref-geo-type-communes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-type-communes} : Updates an existing refGeoTypeCommune.
     *
     * @param refGeoTypeCommune the refGeoTypeCommune to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoTypeCommune,
     * or with status {@code 400 (Bad Request)} if the refGeoTypeCommune is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoTypeCommune couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-type-communes")
    public ResponseEntity<RefGeoTypeCommune> updateRefGeoTypeCommune(@RequestBody RefGeoTypeCommune refGeoTypeCommune) throws URISyntaxException {
        log.debug("REST request to update RefGeoTypeCommune : {}", refGeoTypeCommune);
        if (refGeoTypeCommune.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoTypeCommune result = refGeoTypeCommuneRepository.save(refGeoTypeCommune);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoTypeCommune.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-type-communes} : get all the refGeoTypeCommunes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoTypeCommunes in body.
     */
    @GetMapping("/ref-geo-type-communes")
    public ResponseEntity<List<RefGeoTypeCommune>> getAllRefGeoTypeCommunes(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoTypeCommunes");
        Page<RefGeoTypeCommune> page = refGeoTypeCommuneRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-type-communes/:id} : get the "id" refGeoTypeCommune.
     *
     * @param id the id of the refGeoTypeCommune to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoTypeCommune, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-type-communes/{id}")
    public ResponseEntity<RefGeoTypeCommune> getRefGeoTypeCommune(@PathVariable Long id) {
        log.debug("REST request to get RefGeoTypeCommune : {}", id);
        Optional<RefGeoTypeCommune> refGeoTypeCommune = refGeoTypeCommuneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoTypeCommune);
    }

    /**
     * {@code DELETE  /ref-geo-type-communes/:id} : delete the "id" refGeoTypeCommune.
     *
     * @param id the id of the refGeoTypeCommune to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-type-communes/{id}")
    public ResponseEntity<Void> deleteRefGeoTypeCommune(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoTypeCommune : {}", id);
        refGeoTypeCommuneRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
