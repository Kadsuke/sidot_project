package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoLocalite;
import com.onea.sidot.repository.RefGeoLocaliteRepository;

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
 * Integration tests for the {@link RefGeoLocaliteResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoLocaliteResourceIT {

    private static final String DEFAULT_LOCALITE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITE_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoLocaliteRepository refGeoLocaliteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoLocaliteMockMvc;

    private RefGeoLocalite refGeoLocalite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoLocalite createEntity(EntityManager em) {
        RefGeoLocalite refGeoLocalite = new RefGeoLocalite()
            .localiteName(DEFAULT_LOCALITE_NAME);
        return refGeoLocalite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoLocalite createUpdatedEntity(EntityManager em) {
        RefGeoLocalite refGeoLocalite = new RefGeoLocalite()
            .localiteName(UPDATED_LOCALITE_NAME);
        return refGeoLocalite;
    }

    @BeforeEach
    public void initTest() {
        refGeoLocalite = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoLocalite() throws Exception {
        int databaseSizeBeforeCreate = refGeoLocaliteRepository.findAll().size();
        // Create the RefGeoLocalite
        restRefGeoLocaliteMockMvc.perform(post("/api/ref-geo-localites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoLocalite)))
            .andExpect(status().isCreated());

        // Validate the RefGeoLocalite in the database
        List<RefGeoLocalite> refGeoLocaliteList = refGeoLocaliteRepository.findAll();
        assertThat(refGeoLocaliteList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoLocalite testRefGeoLocalite = refGeoLocaliteList.get(refGeoLocaliteList.size() - 1);
        assertThat(testRefGeoLocalite.getLocaliteName()).isEqualTo(DEFAULT_LOCALITE_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoLocaliteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoLocaliteRepository.findAll().size();

        // Create the RefGeoLocalite with an existing ID
        refGeoLocalite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoLocaliteMockMvc.perform(post("/api/ref-geo-localites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoLocalite)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoLocalite in the database
        List<RefGeoLocalite> refGeoLocaliteList = refGeoLocaliteRepository.findAll();
        assertThat(refGeoLocaliteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoLocalites() throws Exception {
        // Initialize the database
        refGeoLocaliteRepository.saveAndFlush(refGeoLocalite);

        // Get all the refGeoLocaliteList
        restRefGeoLocaliteMockMvc.perform(get("/api/ref-geo-localites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoLocalite.getId().intValue())))
            .andExpect(jsonPath("$.[*].localiteName").value(hasItem(DEFAULT_LOCALITE_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoLocalite() throws Exception {
        // Initialize the database
        refGeoLocaliteRepository.saveAndFlush(refGeoLocalite);

        // Get the refGeoLocalite
        restRefGeoLocaliteMockMvc.perform(get("/api/ref-geo-localites/{id}", refGeoLocalite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoLocalite.getId().intValue()))
            .andExpect(jsonPath("$.localiteName").value(DEFAULT_LOCALITE_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoLocalite() throws Exception {
        // Get the refGeoLocalite
        restRefGeoLocaliteMockMvc.perform(get("/api/ref-geo-localites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoLocalite() throws Exception {
        // Initialize the database
        refGeoLocaliteRepository.saveAndFlush(refGeoLocalite);

        int databaseSizeBeforeUpdate = refGeoLocaliteRepository.findAll().size();

        // Update the refGeoLocalite
        RefGeoLocalite updatedRefGeoLocalite = refGeoLocaliteRepository.findById(refGeoLocalite.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoLocalite are not directly saved in db
        em.detach(updatedRefGeoLocalite);
        updatedRefGeoLocalite
            .localiteName(UPDATED_LOCALITE_NAME);

        restRefGeoLocaliteMockMvc.perform(put("/api/ref-geo-localites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoLocalite)))
            .andExpect(status().isOk());

        // Validate the RefGeoLocalite in the database
        List<RefGeoLocalite> refGeoLocaliteList = refGeoLocaliteRepository.findAll();
        assertThat(refGeoLocaliteList).hasSize(databaseSizeBeforeUpdate);
        RefGeoLocalite testRefGeoLocalite = refGeoLocaliteList.get(refGeoLocaliteList.size() - 1);
        assertThat(testRefGeoLocalite.getLocaliteName()).isEqualTo(UPDATED_LOCALITE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoLocalite() throws Exception {
        int databaseSizeBeforeUpdate = refGeoLocaliteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoLocaliteMockMvc.perform(put("/api/ref-geo-localites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoLocalite)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoLocalite in the database
        List<RefGeoLocalite> refGeoLocaliteList = refGeoLocaliteRepository.findAll();
        assertThat(refGeoLocaliteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoLocalite() throws Exception {
        // Initialize the database
        refGeoLocaliteRepository.saveAndFlush(refGeoLocalite);

        int databaseSizeBeforeDelete = refGeoLocaliteRepository.findAll().size();

        // Delete the refGeoLocalite
        restRefGeoLocaliteMockMvc.perform(delete("/api/ref-geo-localites/{id}", refGeoLocalite.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoLocalite> refGeoLocaliteList = refGeoLocaliteRepository.findAll();
        assertThat(refGeoLocaliteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
