package com.onea.sidot.web.rest;

import com.onea.sidot.domain.RefGeoProvince;
import com.onea.sidot.repository.RefGeoProvinceRepository;
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
 * REST controller for managing {@link com.onea.sidot.domain.RefGeoProvince}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RefGeoProvinceResource {

    private final Logger log = LoggerFactory.getLogger(RefGeoProvinceResource.class);

    private static final String ENTITY_NAME = "refGeoProvince";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RefGeoProvinceRepository refGeoProvinceRepository;

    public RefGeoProvinceResource(RefGeoProvinceRepository refGeoProvinceRepository) {
        this.refGeoProvinceRepository = refGeoProvinceRepository;
    }

    /**
     * {@code POST  /ref-geo-provinces} : Create a new refGeoProvince.
     *
     * @param refGeoProvince the refGeoProvince to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new refGeoProvince, or with status {@code 400 (Bad Request)} if the refGeoProvince has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ref-geo-provinces")
    public ResponseEntity<RefGeoProvince> createRefGeoProvince(@RequestBody RefGeoProvince refGeoProvince) throws URISyntaxException {
        log.debug("REST request to save RefGeoProvince : {}", refGeoProvince);
        if (refGeoProvince.getId() != null) {
            throw new BadRequestAlertException("A new refGeoProvince cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RefGeoProvince result = refGeoProvinceRepository.save(refGeoProvince);
        return ResponseEntity.created(new URI("/api/ref-geo-provinces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ref-geo-provinces} : Updates an existing refGeoProvince.
     *
     * @param refGeoProvince the refGeoProvince to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated refGeoProvince,
     * or with status {@code 400 (Bad Request)} if the refGeoProvince is not valid,
     * or with status {@code 500 (Internal Server Error)} if the refGeoProvince couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ref-geo-provinces")
    public ResponseEntity<RefGeoProvince> updateRefGeoProvince(@RequestBody RefGeoProvince refGeoProvince) throws URISyntaxException {
        log.debug("REST request to update RefGeoProvince : {}", refGeoProvince);
        if (refGeoProvince.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RefGeoProvince result = refGeoProvinceRepository.save(refGeoProvince);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, refGeoProvince.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ref-geo-provinces} : get all the refGeoProvinces.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of refGeoProvinces in body.
     */
    @GetMapping("/ref-geo-provinces")
    public ResponseEntity<List<RefGeoProvince>> getAllRefGeoProvinces(Pageable pageable) {
        log.debug("REST request to get a page of RefGeoProvinces");
        Page<RefGeoProvince> page = refGeoProvinceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ref-geo-provinces/:id} : get the "id" refGeoProvince.
     *
     * @param id the id of the refGeoProvince to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the refGeoProvince, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ref-geo-provinces/{id}")
    public ResponseEntity<RefGeoProvince> getRefGeoProvince(@PathVariable Long id) {
        log.debug("REST request to get RefGeoProvince : {}", id);
        Optional<RefGeoProvince> refGeoProvince = refGeoProvinceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(refGeoProvince);
    }

    /**
     * {@code DELETE  /ref-geo-provinces/:id} : delete the "id" refGeoProvince.
     *
     * @param id the id of the refGeoProvince to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ref-geo-provinces/{id}")
    public ResponseEntity<Void> deleteRefGeoProvince(@PathVariable Long id) {
        log.debug("REST request to delete RefGeoProvince : {}", id);
        refGeoProvinceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
