package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoParcelle;
import com.onea.sidot.repository.RefGeoParcelleRepository;

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
 * Integration tests for the {@link RefGeoParcelleResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoParcelleResourceIT {

    private static final String DEFAULT_PARCELLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARCELLE_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoParcelleRepository refGeoParcelleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoParcelleMockMvc;

    private RefGeoParcelle refGeoParcelle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoParcelle createEntity(EntityManager em) {
        RefGeoParcelle refGeoParcelle = new RefGeoParcelle()
            .parcelleName(DEFAULT_PARCELLE_NAME);
        return refGeoParcelle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoParcelle createUpdatedEntity(EntityManager em) {
        RefGeoParcelle refGeoParcelle = new RefGeoParcelle()
            .parcelleName(UPDATED_PARCELLE_NAME);
        return refGeoParcelle;
    }

    @BeforeEach
    public void initTest() {
        refGeoParcelle = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoParcelle() throws Exception {
        int databaseSizeBeforeCreate = refGeoParcelleRepository.findAll().size();
        // Create the RefGeoParcelle
        restRefGeoParcelleMockMvc.perform(post("/api/ref-geo-parcelles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoParcelle)))
            .andExpect(status().isCreated());

        // Validate the RefGeoParcelle in the database
        List<RefGeoParcelle> refGeoParcelleList = refGeoParcelleRepository.findAll();
        assertThat(refGeoParcelleList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoParcelle testRefGeoParcelle = refGeoParcelleList.get(refGeoParcelleList.size() - 1);
        assertThat(testRefGeoParcelle.getParcelleName()).isEqualTo(DEFAULT_PARCELLE_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoParcelleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoParcelleRepository.findAll().size();

        // Create the RefGeoParcelle with an existing ID
        refGeoParcelle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoParcelleMockMvc.perform(post("/api/ref-geo-parcelles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoParcelle)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoParcelle in the database
        List<RefGeoParcelle> refGeoParcelleList = refGeoParcelleRepository.findAll();
        assertThat(refGeoParcelleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoParcelles() throws Exception {
        // Initialize the database
        refGeoParcelleRepository.saveAndFlush(refGeoParcelle);

        // Get all the refGeoParcelleList
        restRefGeoParcelleMockMvc.perform(get("/api/ref-geo-parcelles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoParcelle.getId().intValue())))
            .andExpect(jsonPath("$.[*].parcelleName").value(hasItem(DEFAULT_PARCELLE_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoParcelle() throws Exception {
        // Initialize the database
        refGeoParcelleRepository.saveAndFlush(refGeoParcelle);

        // Get the refGeoParcelle
        restRefGeoParcelleMockMvc.perform(get("/api/ref-geo-parcelles/{id}", refGeoParcelle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoParcelle.getId().intValue()))
            .andExpect(jsonPath("$.parcelleName").value(DEFAULT_PARCELLE_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoParcelle() throws Exception {
        // Get the refGeoParcelle
        restRefGeoParcelleMockMvc.perform(get("/api/ref-geo-parcelles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoParcelle() throws Exception {
        // Initialize the database
        refGeoParcelleRepository.saveAndFlush(refGeoParcelle);

        int databaseSizeBeforeUpdate = refGeoParcelleRepository.findAll().size();

        // Update the refGeoParcelle
        RefGeoParcelle updatedRefGeoParcelle = refGeoParcelleRepository.findById(refGeoParcelle.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoParcelle are not directly saved in db
        em.detach(updatedRefGeoParcelle);
        updatedRefGeoParcelle
            .parcelleName(UPDATED_PARCELLE_NAME);

        restRefGeoParcelleMockMvc.perform(put("/api/ref-geo-parcelles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoParcelle)))
            .andExpect(status().isOk());

        // Validate the RefGeoParcelle in the database
        List<RefGeoParcelle> refGeoParcelleList = refGeoParcelleRepository.findAll();
        assertThat(refGeoParcelleList).hasSize(databaseSizeBeforeUpdate);
        RefGeoParcelle testRefGeoParcelle = refGeoParcelleList.get(refGeoParcelleList.size() - 1);
        assertThat(testRefGeoParcelle.getParcelleName()).isEqualTo(UPDATED_PARCELLE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoParcelle() throws Exception {
        int databaseSizeBeforeUpdate = refGeoParcelleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoParcelleMockMvc.perform(put("/api/ref-geo-parcelles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoParcelle)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoParcelle in the database
        List<RefGeoParcelle> refGeoParcelleList = refGeoParcelleRepository.findAll();
        assertThat(refGeoParcelleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoParcelle() throws Exception {
        // Initialize the database
        refGeoParcelleRepository.saveAndFlush(refGeoParcelle);

        int databaseSizeBeforeDelete = refGeoParcelleRepository.findAll().size();

        // Delete the refGeoParcelle
        restRefGeoParcelleMockMvc.perform(delete("/api/ref-geo-parcelles/{id}", refGeoParcelle.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoParcelle> refGeoParcelleList = refGeoParcelleRepository.findAll();
        assertThat(refGeoParcelleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
