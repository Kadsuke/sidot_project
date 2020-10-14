package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoTypeCommune;
import com.onea.sidot.repository.RefGeoTypeCommuneRepository;

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
 * Integration tests for the {@link RefGeoTypeCommuneResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoTypeCommuneResourceIT {

    private static final String DEFAULT_TYPE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoTypeCommuneRepository refGeoTypeCommuneRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoTypeCommuneMockMvc;

    private RefGeoTypeCommune refGeoTypeCommune;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoTypeCommune createEntity(EntityManager em) {
        RefGeoTypeCommune refGeoTypeCommune = new RefGeoTypeCommune()
            .typeName(DEFAULT_TYPE_NAME);
        return refGeoTypeCommune;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoTypeCommune createUpdatedEntity(EntityManager em) {
        RefGeoTypeCommune refGeoTypeCommune = new RefGeoTypeCommune()
            .typeName(UPDATED_TYPE_NAME);
        return refGeoTypeCommune;
    }

    @BeforeEach
    public void initTest() {
        refGeoTypeCommune = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoTypeCommune() throws Exception {
        int databaseSizeBeforeCreate = refGeoTypeCommuneRepository.findAll().size();
        // Create the RefGeoTypeCommune
        restRefGeoTypeCommuneMockMvc.perform(post("/api/ref-geo-type-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoTypeCommune)))
            .andExpect(status().isCreated());

        // Validate the RefGeoTypeCommune in the database
        List<RefGeoTypeCommune> refGeoTypeCommuneList = refGeoTypeCommuneRepository.findAll();
        assertThat(refGeoTypeCommuneList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoTypeCommune testRefGeoTypeCommune = refGeoTypeCommuneList.get(refGeoTypeCommuneList.size() - 1);
        assertThat(testRefGeoTypeCommune.getTypeName()).isEqualTo(DEFAULT_TYPE_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoTypeCommuneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoTypeCommuneRepository.findAll().size();

        // Create the RefGeoTypeCommune with an existing ID
        refGeoTypeCommune.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoTypeCommuneMockMvc.perform(post("/api/ref-geo-type-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoTypeCommune)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoTypeCommune in the database
        List<RefGeoTypeCommune> refGeoTypeCommuneList = refGeoTypeCommuneRepository.findAll();
        assertThat(refGeoTypeCommuneList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoTypeCommunes() throws Exception {
        // Initialize the database
        refGeoTypeCommuneRepository.saveAndFlush(refGeoTypeCommune);

        // Get all the refGeoTypeCommuneList
        restRefGeoTypeCommuneMockMvc.perform(get("/api/ref-geo-type-communes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoTypeCommune.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeName").value(hasItem(DEFAULT_TYPE_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoTypeCommune() throws Exception {
        // Initialize the database
        refGeoTypeCommuneRepository.saveAndFlush(refGeoTypeCommune);

        // Get the refGeoTypeCommune
        restRefGeoTypeCommuneMockMvc.perform(get("/api/ref-geo-type-communes/{id}", refGeoTypeCommune.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoTypeCommune.getId().intValue()))
            .andExpect(jsonPath("$.typeName").value(DEFAULT_TYPE_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoTypeCommune() throws Exception {
        // Get the refGeoTypeCommune
        restRefGeoTypeCommuneMockMvc.perform(get("/api/ref-geo-type-communes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoTypeCommune() throws Exception {
        // Initialize the database
        refGeoTypeCommuneRepository.saveAndFlush(refGeoTypeCommune);

        int databaseSizeBeforeUpdate = refGeoTypeCommuneRepository.findAll().size();

        // Update the refGeoTypeCommune
        RefGeoTypeCommune updatedRefGeoTypeCommune = refGeoTypeCommuneRepository.findById(refGeoTypeCommune.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoTypeCommune are not directly saved in db
        em.detach(updatedRefGeoTypeCommune);
        updatedRefGeoTypeCommune
            .typeName(UPDATED_TYPE_NAME);

        restRefGeoTypeCommuneMockMvc.perform(put("/api/ref-geo-type-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoTypeCommune)))
            .andExpect(status().isOk());

        // Validate the RefGeoTypeCommune in the database
        List<RefGeoTypeCommune> refGeoTypeCommuneList = refGeoTypeCommuneRepository.findAll();
        assertThat(refGeoTypeCommuneList).hasSize(databaseSizeBeforeUpdate);
        RefGeoTypeCommune testRefGeoTypeCommune = refGeoTypeCommuneList.get(refGeoTypeCommuneList.size() - 1);
        assertThat(testRefGeoTypeCommune.getTypeName()).isEqualTo(UPDATED_TYPE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoTypeCommune() throws Exception {
        int databaseSizeBeforeUpdate = refGeoTypeCommuneRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoTypeCommuneMockMvc.perform(put("/api/ref-geo-type-communes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoTypeCommune)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoTypeCommune in the database
        List<RefGeoTypeCommune> refGeoTypeCommuneList = refGeoTypeCommuneRepository.findAll();
        assertThat(refGeoTypeCommuneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoTypeCommune() throws Exception {
        // Initialize the database
        refGeoTypeCommuneRepository.saveAndFlush(refGeoTypeCommune);

        int databaseSizeBeforeDelete = refGeoTypeCommuneRepository.findAll().size();

        // Delete the refGeoTypeCommune
        restRefGeoTypeCommuneMockMvc.perform(delete("/api/ref-geo-type-communes/{id}", refGeoTypeCommune.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoTypeCommune> refGeoTypeCommuneList = refGeoTypeCommuneRepository.findAll();
        assertThat(refGeoTypeCommuneList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
