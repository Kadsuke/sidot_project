package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoLocaliteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoLocalite.class);
        RefGeoLocalite refGeoLocalite1 = new RefGeoLocalite();
        refGeoLocalite1.setId(1L);
        RefGeoLocalite refGeoLocalite2 = new RefGeoLocalite();
        refGeoLocalite2.setId(refGeoLocalite1.getId());
        assertThat(refGeoLocalite1).isEqualTo(refGeoLocalite2);
        refGeoLocalite2.setId(2L);
        assertThat(refGeoLocalite1).isNotEqualTo(refGeoLocalite2);
        refGeoLocalite1.setId(null);
        assertThat(refGeoLocalite1).isNotEqualTo(refGeoLocalite2);
    }
}
