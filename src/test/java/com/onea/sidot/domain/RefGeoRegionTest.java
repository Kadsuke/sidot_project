package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoRegionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoRegion.class);
        RefGeoRegion refGeoRegion1 = new RefGeoRegion();
        refGeoRegion1.setId(1L);
        RefGeoRegion refGeoRegion2 = new RefGeoRegion();
        refGeoRegion2.setId(refGeoRegion1.getId());
        assertThat(refGeoRegion1).isEqualTo(refGeoRegion2);
        refGeoRegion2.setId(2L);
        assertThat(refGeoRegion1).isNotEqualTo(refGeoRegion2);
        refGeoRegion1.setId(null);
        assertThat(refGeoRegion1).isNotEqualTo(refGeoRegion2);
    }
}
