package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoProvinceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoProvince.class);
        RefGeoProvince refGeoProvince1 = new RefGeoProvince();
        refGeoProvince1.setId(1L);
        RefGeoProvince refGeoProvince2 = new RefGeoProvince();
        refGeoProvince2.setId(refGeoProvince1.getId());
        assertThat(refGeoProvince1).isEqualTo(refGeoProvince2);
        refGeoProvince2.setId(2L);
        assertThat(refGeoProvince1).isNotEqualTo(refGeoProvince2);
        refGeoProvince1.setId(null);
        assertThat(refGeoProvince1).isNotEqualTo(refGeoProvince2);
    }
}
