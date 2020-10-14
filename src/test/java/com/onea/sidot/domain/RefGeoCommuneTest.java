package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoCommuneTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoCommune.class);
        RefGeoCommune refGeoCommune1 = new RefGeoCommune();
        refGeoCommune1.setId(1L);
        RefGeoCommune refGeoCommune2 = new RefGeoCommune();
        refGeoCommune2.setId(refGeoCommune1.getId());
        assertThat(refGeoCommune1).isEqualTo(refGeoCommune2);
        refGeoCommune2.setId(2L);
        assertThat(refGeoCommune1).isNotEqualTo(refGeoCommune2);
        refGeoCommune1.setId(null);
        assertThat(refGeoCommune1).isNotEqualTo(refGeoCommune2);
    }
}
