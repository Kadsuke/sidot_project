package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoCommune;
import com.onea.sidot.repository.RefGeoCommuneRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RefGeoCommuneResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoCommuneResourceIT {

    private static final String DEFAULT_COMMUNE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMMUNE_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoCommuneRepository refGeoCommuneRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoCommuneMockMvc;

    private RefGeoCommune refGeoCommune;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoCommune createEntity(EntityManager em) {
        RefGeoCommune refGeoCommune = new RefGeoCommune()
            .communeName(DEFAULT_COMMUNE_NAME);
        return refGeoCommune;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoCommune createUpdatedEntity(EntityManager em) {
        RefGeoCommune refGeoCommune = new RefGeoCommune()
            .communeName(UPDATED_COMMUNE_NAME);
        return refGeoCommune;
    }

    @BeforeEach
    public void initTest() {
        refGeoCommune = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoCommune() throws Exception {
        int databaseSizeBeforeCreate = refGeoCommuneRepository.findAll().size();
        // Create the RefGeoCommune
        restRefGeoCommuneMockMvc.perform(post("/api/ref-geo-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoCommune)))
            .andExpect(status().isCreated());

        // Validate the RefGeoCommune in the database
        List<RefGeoCommune> refGeoCommuneList = refGeoCommuneRepository.findAll();
        assertThat(refGeoCommuneList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoCommune testRefGeoCommune = refGeoCommuneList.get(refGeoCommuneList.size() - 1);
        assertThat(testRefGeoCommune.getCommuneName()).isEqualTo(DEFAULT_COMMUNE_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoCommuneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoCommuneRepository.findAll().size();

        // Create the RefGeoCommune with an existing ID
        refGeoCommune.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoCommuneMockMvc.perform(post("/api/ref-geo-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoCommune)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoCommune in the database
        List<RefGeoCommune> refGeoCommuneList = refGeoCommuneRepository.findAll();
        assertThat(refGeoCommuneList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoCommunes() throws Exception {
        // Initialize the database
        refGeoCommuneRepository.saveAndFlush(refGeoCommune);

        // Get all the refGeoCommuneList
        restRefGeoCommuneMockMvc.perform(get("/api/ref-geo-communes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoCommune.getId().intValue())))
            .andExpect(jsonPath("$.[*].communeName").value(hasItem(DEFAULT_COMMUNE_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoCommune() throws Exception {
        // Initialize the database
        refGeoCommuneRepository.saveAndFlush(refGeoCommune);

        // Get the refGeoCommune
        restRefGeoCommuneMockMvc.perform(get("/api/ref-geo-communes/{id}", refGeoCommune.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoCommune.getId().intValue()))
            .andExpect(jsonPath("$.communeName").value(DEFAULT_COMMUNE_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoCommune() throws Exception {
        // Get the refGeoCommune
        restRefGeoCommuneMockMvc.perform(get("/api/ref-geo-communes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoCommune() throws Exception {
        // Initialize the database
        refGeoCommuneRepository.saveAndFlush(refGeoCommune);

        int databaseSizeBeforeUpdate = refGeoCommuneRepository.findAll().size();

        // Update the refGeoCommune
        RefGeoCommune updatedRefGeoCommune = refGeoCommuneRepository.findById(refGeoCommune.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoCommune are not directly saved in db
        em.detach(updatedRefGeoCommune);
        updatedRefGeoCommune
            .communeName(UPDATED_COMMUNE_NAME);

        restRefGeoCommuneMockMvc.perform(put("/api/ref-geo-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoCommune)))
            .andExpect(status().isOk());

        // Validate the RefGeoCommune in the database
        List<RefGeoCommune> refGeoCommuneList = refGeoCommuneRepository.findAll();
        assertThat(refGeoCommuneList).hasSize(databaseSizeBeforeUpdate);
        RefGeoCommune testRefGeoCommune = refGeoCommuneList.get(refGeoCommuneList.size() - 1);
        assertThat(testRefGeoCommune.getCommuneName()).isEqualTo(UPDATED_COMMUNE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoCommune() throws Exception {
        int databaseSizeBeforeUpdate = refGeoCommuneRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoCommuneMockMvc.perform(put("/api/ref-geo-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoCommune)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoCommune in the database
        List<RefGeoCommune> refGeoCommuneList = refGeoCommuneRepository.findAll();
        assertThat(refGeoCommuneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoCommune() throws Exception {
        // Initialize the database
        refGeoCommuneRepository.saveAndFlush(refGeoCommune);

        int databaseSizeBeforeDelete = refGeoCommuneRepository.findAll().size();

        // Delete the refGeoCommune
        restRefGeoCommuneMockMvc.perform(delete("/api/ref-geo-communes/{id}", refGeoCommune.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoCommune> refGeoCommuneList = refGeoCommuneRepository.findAll();
        assertThat(refGeoCommuneList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
