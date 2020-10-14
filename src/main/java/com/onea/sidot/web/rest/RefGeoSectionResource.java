package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoSection;
import com.onea.sidot.repository.RefGeoSectionRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoSection}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoSectionResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoSectionResource.class);

    private static final String ENTITY_NAME = "refGeoSection";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoSectionRepository refGeoSectionRepository;

    public RefGeoSectionResource(RefGeoSectionRepository refGeoSectionRepository) {
        this.refGeoSectionRepository = refGeoSectionRepository;
    }

    /**
     * {@code POST  /ref-geo-sections} : Create a new refGeoSection.
     *
     * @param refGeoSection the refGeoSection to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoSection, or with status {@code 400 (Bad Request)} if the refGeoSection has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-sections")
    public ResponseEntity<RefGeoSection> createRefGeoSection(@RequestBody RefGeoSection refGeoSection) throws URISyntaxException {
        log.debug("REST request to save RefGeoSection : {}", refGeoSection);
        if (refGeoSection.getId() != null) {
            throw new BadRequestAlertException("A new refGeoSection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoSection result = refGeoSectionRepository.save(refGeoSection);
        return ResponseEntity.created(new URI("/api/ref-geo-sections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-sections} : Updates an existing refGeoSection.
     *
     * @param refGeoSection the refGeoSection to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoSection,
     * or with status {@code 400 (Bad Request)} if the refGeoSection is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoSection couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-sections")
    public ResponseEntity<RefGeoSection> updateRefGeoSection(@RequestBody RefGeoSection refGeoSection) throws URISyntaxException {
        log.debug("REST request to update RefGeoSection : {}", refGeoSection);
        if (refGeoSection.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoSection result = refGeoSectionRepository.save(refGeoSection);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoSection.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-sections} : get all the refGeoSections.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoSections in body.
     */
    @GetMapping("/ref-geo-sections")
    public ResponseEntity<List<RefGeoSection>> getAllRefGeoSections(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoSections");
        Page<RefGeoSection> page = refGeoSectionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-sections/:id} : get the "id" refGeoSection.
     *
     * @param id the id of the refGeoSection to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoSection, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-sections/{id}")
    public ResponseEntity<RefGeoSection> getRefGeoSection(@PathVariable Long id) {
        log.debug("REST request to get RefGeoSection : {}", id);
        Optional<RefGeoSection> refGeoSection = refGeoSectionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoSection);
    }

    /**
     * {@code DELETE  /ref-geo-sections/:id} : delete the "id" refGeoSection.
     *
     * @param id the id of the refGeoSection to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-sections/{id}")
    public ResponseEntity<Void> deleteRefGeoSection(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoSection : {}", id);
        refGeoSectionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
