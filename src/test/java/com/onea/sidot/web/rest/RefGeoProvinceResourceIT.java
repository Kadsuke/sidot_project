package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoProvince;
import com.onea.sidot.repository.RefGeoProvinceRepository;

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
 * Integration tests for the {@link RefGeoProvinceResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoProvinceResourceIT {

    private static final String DEFAULT_PROVINCE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCE_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoProvinceRepository refGeoProvinceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoProvinceMockMvc;

    private RefGeoProvince refGeoProvince;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoProvince createEntity(EntityManager em) {
        RefGeoProvince refGeoProvince = new RefGeoProvince()
            .provinceName(DEFAULT_PROVINCE_NAME);
        return refGeoProvince;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoProvince createUpdatedEntity(EntityManager em) {
        RefGeoProvince refGeoProvince = new RefGeoProvince()
            .provinceName(UPDATED_PROVINCE_NAME);
        return refGeoProvince;
    }

    @BeforeEach
    public void initTest() {
        refGeoProvince = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoProvince() throws Exception {
        int databaseSizeBeforeCreate = refGeoProvinceRepository.findAll().size();
        // Create the RefGeoProvince
        restRefGeoProvinceMockMvc.perform(post("/api/ref-geo-provinces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoProvince)))
            .andExpect(status().isCreated());

        // Validate the RefGeoProvince in the database
        List<RefGeoProvince> refGeoProvinceList = refGeoProvinceRepository.findAll();
        assertThat(refGeoProvinceList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoProvince testRefGeoProvince = refGeoProvinceList.get(refGeoProvinceList.size() - 1);
        assertThat(testRefGeoProvince.getProvinceName()).isEqualTo(DEFAULT_PROVINCE_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoProvinceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoProvinceRepository.findAll().size();

        // Create the RefGeoProvince with an existing ID
        refGeoProvince.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoProvinceMockMvc.perform(post("/api/ref-geo-provinces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoProvince)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoProvince in the database
        List<RefGeoProvince> refGeoProvinceList = refGeoProvinceRepository.findAll();
        assertThat(refGeoProvinceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoProvinces() throws Exception {
        // Initialize the database
        refGeoProvinceRepository.saveAndFlush(refGeoProvince);

        // Get all the refGeoProvinceList
        restRefGeoProvinceMockMvc.perform(get("/api/ref-geo-provinces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoProvince.getId().intValue())))
            .andExpect(jsonPath("$.[*].provinceName").value(hasItem(DEFAULT_PROVINCE_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoProvince() throws Exception {
        // Initialize the database
        refGeoProvinceRepository.saveAndFlush(refGeoProvince);

        // Get the refGeoProvince
        restRefGeoProvinceMockMvc.perform(get("/api/ref-geo-provinces/{id}", refGeoProvince.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoProvince.getId().intValue()))
            .andExpect(jsonPath("$.provinceName").value(DEFAULT_PROVINCE_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoProvince() throws Exception {
        // Get the refGeoProvince
        restRefGeoProvinceMockMvc.perform(get("/api/ref-geo-provinces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoProvince() throws Exception {
        // Initialize the database
        refGeoProvinceRepository.saveAndFlush(refGeoProvince);

        int databaseSizeBeforeUpdate = refGeoProvinceRepository.findAll().size();

        // Update the refGeoProvince
        RefGeoProvince updatedRefGeoProvince = refGeoProvinceRepository.findById(refGeoProvince.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoProvince are not directly saved in db
        em.detach(updatedRefGeoProvince);
        updatedRefGeoProvince
            .provinceName(UPDATED_PROVINCE_NAME);

        restRefGeoProvinceMockMvc.perform(put("/api/ref-geo-provinces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoProvince)))
            .andExpect(status().isOk());

        // Validate the RefGeoProvince in the database
        List<RefGeoProvince> refGeoProvinceList = refGeoProvinceRepository.findAll();
        assertThat(refGeoProvinceList).hasSize(databaseSizeBeforeUpdate);
        RefGeoProvince testRefGeoProvince = refGeoProvinceList.get(refGeoProvinceList.size() - 1);
        assertThat(testRefGeoProvince.getProvinceName()).isEqualTo(UPDATED_PROVINCE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoProvince() throws Exception {
        int databaseSizeBeforeUpdate = refGeoProvinceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoProvinceMockMvc.perform(put("/api/ref-geo-provinces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoProvince)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoProvince in the database
        List<RefGeoProvince> refGeoProvinceList = refGeoProvinceRepository.findAll();
        assertThat(refGeoProvinceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoProvince() throws Exception {
        // Initialize the database
        refGeoProvinceRepository.saveAndFlush(refGeoProvince);

        int databaseSizeBeforeDelete = refGeoProvinceRepository.findAll().size();

        // Delete the refGeoProvince
        restRefGeoProvinceMockMvc.perform(delete("/api/ref-geo-provinces/{id}", refGeoProvince.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoProvince> refGeoProvinceList = refGeoProvinceRepository.findAll();
        assertThat(refGeoProvinceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
