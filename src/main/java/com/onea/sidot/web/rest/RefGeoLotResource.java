package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoLot;
import com.onea.sidot.repository.RefGeoLotRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoLot}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoLotResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoLotResource.class);

    private static final String ENTITY_NAME = "refGeoLot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoLotRepository refGeoLotRepository;

    public RefGeoLotResource(RefGeoLotRepository refGeoLotRepository) {
        this.refGeoLotRepository = refGeoLotRepository;
    }

    /**
     * {@code POST  /ref-geo-lots} : Create a new refGeoLot.
     *
     * @param refGeoLot the refGeoLot to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoLot, or with status {@code 400 (Bad Request)} if the refGeoLot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-lots")
    public ResponseEntity<RefGeoLot> createRefGeoLot(@RequestBody RefGeoLot refGeoLot) throws URISyntaxException {
        log.debug("REST request to save RefGeoLot : {}", refGeoLot);
        if (refGeoLot.getId() != null) {
            throw new BadRequestAlertException("A new refGeoLot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoLot result = refGeoLotRepository.save(refGeoLot);
        return ResponseEntity.created(new URI("/api/ref-geo-lots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-lots} : Updates an existing refGeoLot.
     *
     * @param refGeoLot the refGeoLot to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoLot,
     * or with status {@code 400 (Bad Request)} if the refGeoLot is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoLot couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-lots")
    public ResponseEntity<RefGeoLot> updateRefGeoLot(@RequestBody RefGeoLot refGeoLot) throws URISyntaxException {
        log.debug("REST request to update RefGeoLot : {}", refGeoLot);
        if (refGeoLot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoLot result = refGeoLotRepository.save(refGeoLot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoLot.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-lots} : get all the refGeoLots.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoLots in body.
     */
    @GetMapping("/ref-geo-lots")
    public ResponseEntity<List<RefGeoLot>> getAllRefGeoLots(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoLots");
        Page<RefGeoLot> page = refGeoLotRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-lots/:id} : get the "id" refGeoLot.
     *
     * @param id the id of the refGeoLot to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoLot, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-lots/{id}")
    public ResponseEntity<RefGeoLot> getRefGeoLot(@PathVariable Long id) {
        log.debug("REST request to get RefGeoLot : {}", id);
        Optional<RefGeoLot> refGeoLot = refGeoLotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoLot);
    }

    /**
     * {@code DELETE  /ref-geo-lots/:id} : delete the "id" refGeoLot.
     *
     * @param id the id of the refGeoLot to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-lots/{id}")
    public ResponseEntity<Void> deleteRefGeoLot(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoLot : {}", id);
        refGeoLotRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
