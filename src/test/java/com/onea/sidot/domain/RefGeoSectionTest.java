package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoSectionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoSection.class);
        RefGeoSection refGeoSection1 = new RefGeoSection();
        refGeoSection1.setId(1L);
        RefGeoSection refGeoSection2 = new RefGeoSection();
        refGeoSection2.setId(refGeoSection1.getId());
        assertThat(refGeoSection1).isEqualTo(refGeoSection2);
        refGeoSection2.setId(2L);
        assertThat(refGeoSection1).isNotEqualTo(refGeoSection2);
        refGeoSection1.setId(null);
        assertThat(refGeoSection1).isNotEqualTo(refGeoSection2);
    }
}
