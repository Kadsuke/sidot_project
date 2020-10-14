package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoLocalite;
import com.onea.sidot.repository.RefGeoLocaliteRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoLocalite}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoLocaliteResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoLocaliteResource.class);

    private static final String ENTITY_NAME = "refGeoLocalite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoLocaliteRepository refGeoLocaliteRepository;

    public RefGeoLocaliteResource(RefGeoLocaliteRepository refGeoLocaliteRepository) {
        this.refGeoLocaliteRepository = refGeoLocaliteRepository;
    }

    /**
     * {@code POST  /ref-geo-localites} : Create a new refGeoLocalite.
     *
     * @param refGeoLocalite the refGeoLocalite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoLocalite, or with status {@code 400 (Bad Request)} if the refGeoLocalite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-localites")
    public ResponseEntity<RefGeoLocalite> createRefGeoLocalite(@RequestBody RefGeoLocalite refGeoLocalite) throws URISyntaxException {
        log.debug("REST request to save RefGeoLocalite : {}", refGeoLocalite);
        if (refGeoLocalite.getId() != null) {
            throw new BadRequestAlertException("A new refGeoLocalite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoLocalite result = refGeoLocaliteRepository.save(refGeoLocalite);
        return ResponseEntity.created(new URI("/api/ref-geo-localites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-localites} : Updates an existing refGeoLocalite.
     *
     * @param refGeoLocalite the refGeoLocalite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoLocalite,
     * or with status {@code 400 (Bad Request)} if the refGeoLocalite is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoLocalite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-localites")
    public ResponseEntity<RefGeoLocalite> updateRefGeoLocalite(@RequestBody RefGeoLocalite refGeoLocalite) throws URISyntaxException {
        log.debug("REST request to update RefGeoLocalite : {}", refGeoLocalite);
        if (refGeoLocalite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoLocalite result = refGeoLocaliteRepository.save(refGeoLocalite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoLocalite.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-localites} : get all the refGeoLocalites.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoLocalites in body.
     */
    @GetMapping("/ref-geo-localites")
    public ResponseEntity<List<RefGeoLocalite>> getAllRefGeoLocalites(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoLocalites");
        Page<RefGeoLocalite> page = refGeoLocaliteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-localites/:id} : get the "id" refGeoLocalite.
     *
     * @param id the id of the refGeoLocalite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoLocalite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-localites/{id}")
    public ResponseEntity<RefGeoLocalite> getRefGeoLocalite(@PathVariable Long id) {
        log.debug("REST request to get RefGeoLocalite : {}", id);
        Optional<RefGeoLocalite> refGeoLocalite = refGeoLocaliteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoLocalite);
    }

    /**
     * {@code DELETE  /ref-geo-localites/:id} : delete the "id" refGeoLocalite.
     *
     * @param id the id of the refGeoLocalite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-localites/{id}")
    public ResponseEntity<Void> deleteRefGeoLocalite(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoLocalite : {}", id);
        refGeoLocaliteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
