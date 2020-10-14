package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoTypeCommuneTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoTypeCommune.class);
        RefGeoTypeCommune refGeoTypeCommune1 = new RefGeoTypeCommune();
        refGeoTypeCommune1.setId(1L);
        RefGeoTypeCommune refGeoTypeCommune2 = new RefGeoTypeCommune();
        refGeoTypeCommune2.setId(refGeoTypeCommune1.getId());
        assertThat(refGeoTypeCommune1).isEqualTo(refGeoTypeCommune2);
        refGeoTypeCommune2.setId(2L);
        assertThat(refGeoTypeCommune1).isNotEqualTo(refGeoTypeCommune2);
        refGeoTypeCommune1.setId(null);
        assertThat(refGeoTypeCommune1).isNotEqualTo(refGeoTypeCommune2);
    }
}
