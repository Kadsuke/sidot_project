package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoCommune;
import com.onea.sidot.repository.RefGeoCommuneRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoCommune}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoCommuneResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoCommuneResource.class);

    private static final String ENTITY_NAME = "refGeoCommune";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoCommuneRepository refGeoCommuneRepository;

    public RefGeoCommuneResource(RefGeoCommuneRepository refGeoCommuneRepository) {
        this.refGeoCommuneRepository = refGeoCommuneRepository;
    }

    /**
     * {@code POST  /ref-geo-communes} : Create a new refGeoCommune.
     *
     * @param refGeoCommune the refGeoCommune to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoCommune, or with status {@code 400 (Bad Request)} if the refGeoCommune has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-communes")
    public ResponseEntity<RefGeoCommune> createRefGeoCommune(@RequestBody RefGeoCommune refGeoCommune) throws URISyntaxException {
        log.debug("REST request to save RefGeoCommune : {}", refGeoCommune);
        if (refGeoCommune.getId() != null) {
            throw new BadRequestAlertException("A new refGeoCommune cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoCommune result = refGeoCommuneRepository.save(refGeoCommune);
        return ResponseEntity.created(new URI("/api/ref-geo-communes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-communes} : Updates an existing refGeoCommune.
     *
     * @param refGeoCommune the refGeoCommune to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoCommune,
     * or with status {@code 400 (Bad Request)} if the refGeoCommune is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoCommune couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-communes")
    public ResponseEntity<RefGeoCommune> updateRefGeoCommune(@RequestBody RefGeoCommune refGeoCommune) throws URISyntaxException {
        log.debug("REST request to update RefGeoCommune : {}", refGeoCommune);
        if (refGeoCommune.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoCommune result = refGeoCommuneRepository.save(refGeoCommune);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoCommune.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-communes} : get all the refGeoCommunes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoCommunes in body.
     */
    @GetMapping("/ref-geo-communes")
    public ResponseEntity<List<RefGeoCommune>> getAllRefGeoCommunes(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoCommunes");
        Page<RefGeoCommune> page = refGeoCommuneRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-communes/:id} : get the "id" refGeoCommune.
     *
     * @param id the id of the refGeoCommune to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoCommune, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-communes/{id}")
    public ResponseEntity<RefGeoCommune> getRefGeoCommune(@PathVariable Long id) {
        log.debug("REST request to get RefGeoCommune : {}", id);
        Optional<RefGeoCommune> refGeoCommune = refGeoCommuneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoCommune);
    }

    /**
     * {@code DELETE  /ref-geo-communes/:id} : delete the "id" refGeoCommune.
     *
     * @param id the id of the refGeoCommune to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-communes/{id}")
    public ResponseEntity<Void> deleteRefGeoCommune(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoCommune : {}", id);
        refGeoCommuneRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
