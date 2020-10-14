package com.onea.sidot.web.rest;

import com.onea.sidot.SidotApp;
import com.onea.sidot.domain.RefGeoLot;
import com.onea.sidot.repository.RefGeoLotRepository;

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
 * Integration tests for the {@link RefGeoLotResource} REST controller.
 */
@SpringBootTest(classes = SidotApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RefGeoLotResourceIT {

    private static final String DEFAULT_LOT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOT_NAME = "BBBBBBBBBB";

    @Autowired
    private RefGeoLotRepository refGeoLotRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRefGeoLotMockMvc;

    private RefGeoLot refGeoLot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoLot createEntity(EntityManager em) {
        RefGeoLot refGeoLot = new RefGeoLot()
            .lotName(DEFAULT_LOT_NAME);
        return refGeoLot;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RefGeoLot createUpdatedEntity(EntityManager em) {
        RefGeoLot refGeoLot = new RefGeoLot()
            .lotName(UPDATED_LOT_NAME);
        return refGeoLot;
    }

    @BeforeEach
    public void initTest() {
        refGeoLot = createEntity(em);
    }

    @Test
    @Transactional
    public void createRefGeoLot() throws Exception {
        int databaseSizeBeforeCreate = refGeoLotRepository.findAll().size();
        // Create the RefGeoLot
        restRefGeoLotMockMvc.perform(post("/api/ref-geo-lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoLot)))
            .andExpect(status().isCreated());

        // Validate the RefGeoLot in the database
        List<RefGeoLot> refGeoLotList = refGeoLotRepository.findAll();
        assertThat(refGeoLotList).hasSize(databaseSizeBeforeCreate + 1);
        RefGeoLot testRefGeoLot = refGeoLotList.get(refGeoLotList.size() - 1);
        assertThat(testRefGeoLot.getLotName()).isEqualTo(DEFAULT_LOT_NAME);
    }

    @Test
    @Transactional
    public void createRefGeoLotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = refGeoLotRepository.findAll().size();

        // Create the RefGeoLot with an existing ID
        refGeoLot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRefGeoLotMockMvc.perform(post("/api/ref-geo-lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoLot)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoLot in the database
        List<RefGeoLot> refGeoLotList = refGeoLotRepository.findAll();
        assertThat(refGeoLotList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRefGeoLots() throws Exception {
        // Initialize the database
        refGeoLotRepository.saveAndFlush(refGeoLot);

        // Get all the refGeoLotList
        restRefGeoLotMockMvc.perform(get("/api/ref-geo-lots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(refGeoLot.getId().intValue())))
            .andExpect(jsonPath("$.[*].lotName").value(hasItem(DEFAULT_LOT_NAME)));
    }
    
    @Test
    @Transactional
    public void getRefGeoLot() throws Exception {
        // Initialize the database
        refGeoLotRepository.saveAndFlush(refGeoLot);

        // Get the refGeoLot
        restRefGeoLotMockMvc.perform(get("/api/ref-geo-lots/{id}", refGeoLot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(refGeoLot.getId().intValue()))
            .andExpect(jsonPath("$.lotName").value(DEFAULT_LOT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRefGeoLot() throws Exception {
        // Get the refGeoLot
        restRefGeoLotMockMvc.perform(get("/api/ref-geo-lots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRefGeoLot() throws Exception {
        // Initialize the database
        refGeoLotRepository.saveAndFlush(refGeoLot);

        int databaseSizeBeforeUpdate = refGeoLotRepository.findAll().size();

        // Update the refGeoLot
        RefGeoLot updatedRefGeoLot = refGeoLotRepository.findById(refGeoLot.getId()).get();
        // Disconnect from session so that the updates on updatedRefGeoLot are not directly saved in db
        em.detach(updatedRefGeoLot);
        updatedRefGeoLot
            .lotName(UPDATED_LOT_NAME);

        restRefGeoLotMockMvc.perform(put("/api/ref-geo-lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRefGeoLot)))
            .andExpect(status().isOk());

        // Validate the RefGeoLot in the database
        List<RefGeoLot> refGeoLotList = refGeoLotRepository.findAll();
        assertThat(refGeoLotList).hasSize(databaseSizeBeforeUpdate);
        RefGeoLot testRefGeoLot = refGeoLotList.get(refGeoLotList.size() - 1);
        assertThat(testRefGeoLot.getLotName()).isEqualTo(UPDATED_LOT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRefGeoLot() throws Exception {
        int databaseSizeBeforeUpdate = refGeoLotRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRefGeoLotMockMvc.perform(put("/api/ref-geo-lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(refGeoLot)))
            .andExpect(status().isBadRequest());

        // Validate the RefGeoLot in the database
        List<RefGeoLot> refGeoLotList = refGeoLotRepository.findAll();
        assertThat(refGeoLotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRefGeoLot() throws Exception {
        // Initialize the database
        refGeoLotRepository.saveAndFlush(refGeoLot);

        int databaseSizeBeforeDelete = refGeoLotRepository.findAll().size();

        // Delete the refGeoLot
        restRefGeoLotMockMvc.perform(delete("/api/ref-geo-lots/{id}", refGeoLot.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RefGeoLot> refGeoLotList = refGeoLotRepository.findAll();
        assertThat(refGeoLotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
