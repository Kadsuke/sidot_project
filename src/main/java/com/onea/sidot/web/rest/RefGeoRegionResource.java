package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoRegion;
import com.onea.sidot.repository.RefGeoRegionRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoRegion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoRegionResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoRegionResource.class);

    private static final String ENTITY_NAME = "refGeoRegion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoRegionRepository refGeoRegionRepository;

    public RefGeoRegionResource(RefGeoRegionRepository refGeoRegionRepository) {
        this.refGeoRegionRepository = refGeoRegionRepository;
    }

    /**
     * {@code POST  /ref-geo-regions} : Create a new refGeoRegion.
     *
     * @param refGeoRegion the refGeoRegion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoRegion, or with status {@code 400 (Bad Request)} if the refGeoRegion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-regions")
    public ResponseEntity<RefGeoRegion> createRefGeoRegion(@RequestBody RefGeoRegion refGeoRegion) throws URISyntaxException {
        log.debug("REST request to save RefGeoRegion : {}", refGeoRegion);
        if (refGeoRegion.getId() != null) {
            throw new BadRequestAlertException("A new refGeoRegion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoRegion result = refGeoRegionRepository.save(refGeoRegion);
        return ResponseEntity.created(new URI("/api/ref-geo-regions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-regions} : Updates an existing refGeoRegion.
     *
     * @param refGeoRegion the refGeoRegion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoRegion,
     * or with status {@code 400 (Bad Request)} if the refGeoRegion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoRegion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-regions")
    public ResponseEntity<RefGeoRegion> updateRefGeoRegion(@RequestBody RefGeoRegion refGeoRegion) throws URISyntaxException {
        log.debug("REST request to update RefGeoRegion : {}", refGeoRegion);
        if (refGeoRegion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoRegion result = refGeoRegionRepository.save(refGeoRegion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoRegion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-regions} : get all the refGeoRegions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoRegions in body.
     */
    @GetMapping("/ref-geo-regions")
    public ResponseEntity<List<RefGeoRegion>> getAllRefGeoRegions(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoRegions");
        Page<RefGeoRegion> page = refGeoRegionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-regions/:id} : get the "id" refGeoRegion.
     *
     * @param id the id of the refGeoRegion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoRegion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-regions/{id}")
    public ResponseEntity<RefGeoRegion> getRefGeoRegion(@PathVariable Long id) {
        log.debug("REST request to get RefGeoRegion : {}", id);
        Optional<RefGeoRegion> refGeoRegion = refGeoRegionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoRegion);
    }

    /**
     * {@code DELETE  /ref-geo-regions/:id} : delete the "id" refGeoRegion.
     *
     * @param id the id of the refGeoRegion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-regions/{id}")
    public ResponseEntity<Void> deleteRefGeoRegion(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoRegion : {}", id);
        refGeoRegionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
