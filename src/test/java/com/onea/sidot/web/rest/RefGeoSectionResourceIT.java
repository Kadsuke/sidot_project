package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoSection;
import com.onea.sidot.repository.RefGeoSectionRepository;

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
 * Integration tests for the {@link RefGeoSectionResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoSectionResourceIT {

    private static final String DEFAULT_SECTION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SECTION_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoSectionRepository refGeoSectionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoSectionMockMvc;

    private RefGeoSection refGeoSection;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoSection createEntity(EntityManager em) {
        RefGeoSection refGeoSection = new RefGeoSection()
            .sectionName(DEFAULT_SECTION_NAME);
        return refGeoSection;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoSection createUpdatedEntity(EntityManager em) {
        RefGeoSection refGeoSection = new RefGeoSection()
            .sectionName(UPDATED_SECTION_NAME);
        return refGeoSection;
    }

    @BeforeEach
    public void initTest() {
        refGeoSection = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoSection() throws Exception {
        int databaseSizeBeforeCreate = refGeoSectionRepository.findAll().size();
        // Create the RefGeoSection
        restRefGeoSectionMockMvc.perform(post("/api/ref-geo-sections")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoSection)))
            .andExpect(status().isCreated());

        // Validate the RefGeoSection in the database
        List<RefGeoSection> refGeoSectionList = refGeoSectionRepository.findAll();
        assertThat(refGeoSectionList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoSection testRefGeoSection = refGeoSectionList.get(refGeoSectionList.size() - 1);
        assertThat(testRefGeoSection.getSectionName()).isEqualTo(DEFAULT_SECTION_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoSectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoSectionRepository.findAll().size();

        // Create the RefGeoSection with an existing ID
        refGeoSection.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoSectionMockMvc.perform(post("/api/ref-geo-sections")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoSection)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoSection in the database
        List<RefGeoSection> refGeoSectionList = refGeoSectionRepository.findAll();
        assertThat(refGeoSectionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoSections() throws Exception {
        // Initialize the database
        refGeoSectionRepository.saveAndFlush(refGeoSection);

        // Get all the refGeoSectionList
        restRefGeoSectionMockMvc.perform(get("/api/ref-geo-sections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoSection.getId().intValue())))
            .andExpect(jsonPath("$.[*].sectionName").value(hasItem(DEFAULT_SECTION_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoSection() throws Exception {
        // Initialize the database
        refGeoSectionRepository.saveAndFlush(refGeoSection);

        // Get the refGeoSection
        restRefGeoSectionMockMvc.perform(get("/api/ref-geo-sections/{id}", refGeoSection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoSection.getId().intValue()))
            .andExpect(jsonPath("$.sectionName").value(DEFAULT_SECTION_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoSection() throws Exception {
        // Get the refGeoSection
        restRefGeoSectionMockMvc.perform(get("/api/ref-geo-sections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoSection() throws Exception {
        // Initialize the database
        refGeoSectionRepository.saveAndFlush(refGeoSection);

        int databaseSizeBeforeUpdate = refGeoSectionRepository.findAll().size();

        // Update the refGeoSection
        RefGeoSection updatedRefGeoSection = refGeoSectionRepository.findById(refGeoSection.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoSection are not directly saved in db
        em.detach(updatedRefGeoSection);
        updatedRefGeoSection
            .sectionName(UPDATED_SECTION_NAME);

        restRefGeoSectionMockMvc.perform(put("/api/ref-geo-sections")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoSection)))
            .andExpect(status().isOk());

        // Validate the RefGeoSection in the database
        List<RefGeoSection> refGeoSectionList = refGeoSectionRepository.findAll();
        assertThat(refGeoSectionList).hasSize(databaseSizeBeforeUpdate);
        RefGeoSection testRefGeoSection = refGeoSectionList.get(refGeoSectionList.size() - 1);
        assertThat(testRefGeoSection.getSectionName()).isEqualTo(UPDATED_SECTION_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoSection() throws Exception {
        int databaseSizeBeforeUpdate = refGeoSectionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoSectionMockMvc.perform(put("/api/ref-geo-sections")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoSection)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoSection in the database
        List<RefGeoSection> refGeoSectionList = refGeoSectionRepository.findAll();
        assertThat(refGeoSectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoSection() throws Exception {
        // Initialize the database
        refGeoSectionRepository.saveAndFlush(refGeoSection);

        int databaseSizeBeforeDelete = refGeoSectionRepository.findAll().size();

        // Delete the refGeoSection
        restRefGeoSectionMockMvc.perform(delete("/api/ref-geo-sections/{id}", refGeoSection.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoSection> refGeoSectionList = refGeoSectionRepository.findAll();
        assertThat(refGeoSectionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
