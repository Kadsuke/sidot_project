package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoSecteur;
import com.onea.sidot.repository.RefGeoSecteurRepository;

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
 * Integration tests for the {@link RefGeoSecteurResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoSecteurResourceIT {

    private static final String DEFAULT_SECTEUR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SECTEUR_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoSecteurRepository refGeoSecteurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoSecteurMockMvc;

    private RefGeoSecteur refGeoSecteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoSecteur createEntity(EntityManager em) {
        RefGeoSecteur refGeoSecteur = new RefGeoSecteur()
            .secteurName(DEFAULT_SECTEUR_NAME);
        return refGeoSecteur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoSecteur createUpdatedEntity(EntityManager em) {
        RefGeoSecteur refGeoSecteur = new RefGeoSecteur()
            .secteurName(UPDATED_SECTEUR_NAME);
        return refGeoSecteur;
    }

    @BeforeEach
    public void initTest() {
        refGeoSecteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoSecteur() throws Exception {
        int databaseSizeBeforeCreate = refGeoSecteurRepository.findAll().size();
        // Create the RefGeoSecteur
        restRefGeoSecteurMockMvc.perform(post("/api/ref-geo-secteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoSecteur)))
            .andExpect(status().isCreated());

        // Validate the RefGeoSecteur in the database
        List<RefGeoSecteur> refGeoSecteurList = refGeoSecteurRepository.findAll();
        assertThat(refGeoSecteurList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoSecteur testRefGeoSecteur = refGeoSecteurList.get(refGeoSecteurList.size() - 1);
        assertThat(testRefGeoSecteur.getSecteurName()).isEqualTo(DEFAULT_SECTEUR_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoSecteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoSecteurRepository.findAll().size();

        // Create the RefGeoSecteur with an existing ID
        refGeoSecteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoSecteurMockMvc.perform(post("/api/ref-geo-secteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoSecteur)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoSecteur in the database
        List<RefGeoSecteur> refGeoSecteurList = refGeoSecteurRepository.findAll();
        assertThat(refGeoSecteurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoSecteurs() throws Exception {
        // Initialize the database
        refGeoSecteurRepository.saveAndFlush(refGeoSecteur);

        // Get all the refGeoSecteurList
        restRefGeoSecteurMockMvc.perform(get("/api/ref-geo-secteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoSecteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].secteurName").value(hasItem(DEFAULT_SECTEUR_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoSecteur() throws Exception {
        // Initialize the database
        refGeoSecteurRepository.saveAndFlush(refGeoSecteur);

        // Get the refGeoSecteur
        restRefGeoSecteurMockMvc.perform(get("/api/ref-geo-secteurs/{id}", refGeoSecteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoSecteur.getId().intValue()))
            .andExpect(jsonPath("$.secteurName").value(DEFAULT_SECTEUR_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoSecteur() throws Exception {
        // Get the refGeoSecteur
        restRefGeoSecteurMockMvc.perform(get("/api/ref-geo-secteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoSecteur() throws Exception {
        // Initialize the database
        refGeoSecteurRepository.saveAndFlush(refGeoSecteur);

        int databaseSizeBeforeUpdate = refGeoSecteurRepository.findAll().size();

        // Update the refGeoSecteur
        RefGeoSecteur updatedRefGeoSecteur = refGeoSecteurRepository.findById(refGeoSecteur.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoSecteur are not directly saved in db
        em.detach(updatedRefGeoSecteur);
        updatedRefGeoSecteur
            .secteurName(UPDATED_SECTEUR_NAME);

        restRefGeoSecteurMockMvc.perform(put("/api/ref-geo-secteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoSecteur)))
            .andExpect(status().isOk());

        // Validate the RefGeoSecteur in the database
        List<RefGeoSecteur> refGeoSecteurList = refGeoSecteurRepository.findAll();
        assertThat(refGeoSecteurList).hasSize(databaseSizeBeforeUpdate);
        RefGeoSecteur testRefGeoSecteur = refGeoSecteurList.get(refGeoSecteurList.size() - 1);
        assertThat(testRefGeoSecteur.getSecteurName()).isEqualTo(UPDATED_SECTEUR_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoSecteur() throws Exception {
        int databaseSizeBeforeUpdate = refGeoSecteurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoSecteurMockMvc.perform(put("/api/ref-geo-secteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoSecteur)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoSecteur in the database
        List<RefGeoSecteur> refGeoSecteurList = refGeoSecteurRepository.findAll();
        assertThat(refGeoSecteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoSecteur() throws Exception {
        // Initialize the database
        refGeoSecteurRepository.saveAndFlush(refGeoSecteur);

        int databaseSizeBeforeDelete = refGeoSecteurRepository.findAll().size();

        // Delete the refGeoSecteur
        restRefGeoSecteurMockMvc.perform(delete("/api/ref-geo-secteurs/{id}", refGeoSecteur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoSecteur> refGeoSecteurList = refGeoSecteurRepository.findAll();
        assertThat(refGeoSecteurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
