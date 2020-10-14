package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoRegion;
import com.onea.sidot.repository.RefGeoRegionRepository;

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
 * Integration tests for the {@link RefGeoRegionResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoRegionResourceIT {

    private static final String DEFAULT_REGION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REGION_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoRegionRepository refGeoRegionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoRegionMockMvc;

    private RefGeoRegion refGeoRegion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoRegion createEntity(EntityManager em) {
        RefGeoRegion refGeoRegion = new RefGeoRegion()
            .regionName(DEFAULT_REGION_NAME);
        return refGeoRegion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoRegion createUpdatedEntity(EntityManager em) {
        RefGeoRegion refGeoRegion = new RefGeoRegion()
            .regionName(UPDATED_REGION_NAME);
        return refGeoRegion;
    }

    @BeforeEach
    public void initTest() {
        refGeoRegion = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoRegion() throws Exception {
        int databaseSizeBeforeCreate = refGeoRegionRepository.findAll().size();
        // Create the RefGeoRegion
        restRefGeoRegionMockMvc.perform(post("/api/ref-geo-regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoRegion)))
            .andExpect(status().isCreated());

        // Validate the RefGeoRegion in the database
        List<RefGeoRegion> refGeoRegionList = refGeoRegionRepository.findAll();
        assertThat(refGeoRegionList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoRegion testRefGeoRegion = refGeoRegionList.get(refGeoRegionList.size() - 1);
        assertThat(testRefGeoRegion.getRegionName()).isEqualTo(DEFAULT_REGION_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoRegionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoRegionRepository.findAll().size();

        // Create the RefGeoRegion with an existing ID
        refGeoRegion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoRegionMockMvc.perform(post("/api/ref-geo-regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoRegion)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoRegion in the database
        List<RefGeoRegion> refGeoRegionList = refGeoRegionRepository.findAll();
        assertThat(refGeoRegionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoRegions() throws Exception {
        // Initialize the database
        refGeoRegionRepository.saveAndFlush(refGeoRegion);

        // Get all the refGeoRegionList
        restRefGeoRegionMockMvc.perform(get("/api/ref-geo-regions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoRegion.getId().intValue())))
            .andExpect(jsonPath("$.[*].regionName").value(hasItem(DEFAULT_REGION_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoRegion() throws Exception {
        // Initialize the database
        refGeoRegionRepository.saveAndFlush(refGeoRegion);

        // Get the refGeoRegion
        restRefGeoRegionMockMvc.perform(get("/api/ref-geo-regions/{id}", refGeoRegion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoRegion.getId().intValue()))
            .andExpect(jsonPath("$.regionName").value(DEFAULT_REGION_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoRegion() throws Exception {
        // Get the refGeoRegion
        restRefGeoRegionMockMvc.perform(get("/api/ref-geo-regions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoRegion() throws Exception {
        // Initialize the database
        refGeoRegionRepository.saveAndFlush(refGeoRegion);

        int databaseSizeBeforeUpdate = refGeoRegionRepository.findAll().size();

        // Update the refGeoRegion
        RefGeoRegion updatedRefGeoRegion = refGeoRegionRepository.findById(refGeoRegion.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoRegion are not directly saved in db
        em.detach(updatedRefGeoRegion);
        updatedRefGeoRegion
            .regionName(UPDATED_REGION_NAME);

        restRefGeoRegionMockMvc.perform(put("/api/ref-geo-regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoRegion)))
            .andExpect(status().isOk());

        // Validate the RefGeoRegion in the database
        List<RefGeoRegion> refGeoRegionList = refGeoRegionRepository.findAll();
        assertThat(refGeoRegionList).hasSize(databaseSizeBeforeUpdate);
        RefGeoRegion testRefGeoRegion = refGeoRegionList.get(refGeoRegionList.size() - 1);
        assertThat(testRefGeoRegion.getRegionName()).isEqualTo(UPDATED_REGION_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoRegion() throws Exception {
        int databaseSizeBeforeUpdate = refGeoRegionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoRegionMockMvc.perform(put("/api/ref-geo-regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoRegion)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoRegion in the database
        List<RefGeoRegion> refGeoRegionList = refGeoRegionRepository.findAll();
        assertThat(refGeoRegionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoRegion() throws Exception {
        // Initialize the database
        refGeoRegionRepository.saveAndFlush(refGeoRegion);

        int databaseSizeBeforeDelete = refGeoRegionRepository.findAll().size();

        // Delete the refGeoRegion
        restRefGeoRegionMockMvc.perform(delete("/api/ref-geo-regions/{id}", refGeoRegion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoRegion> refGeoRegionList = refGeoRegionRepository.findAll();
        assertThat(refGeoRegionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
