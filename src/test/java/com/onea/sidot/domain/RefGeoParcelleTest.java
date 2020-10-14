package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoParcelleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoParcelle.class);
        RefGeoParcelle refGeoParcelle1 = new RefGeoParcelle();
        refGeoParcelle1.setId(1L);
        RefGeoParcelle refGeoParcelle2 = new RefGeoParcelle();
        refGeoParcelle2.setId(refGeoParcelle1.getId());
        assertThat(refGeoParcelle1).isEqualTo(refGeoParcelle2);
        refGeoParcelle2.setId(2L);
        assertThat(refGeoParcelle1).isNotEqualTo(refGeoParcelle2);
        refGeoParcelle1.setId(null);
        assertThat(refGeoParcelle1).isNotEqualTo(refGeoParcelle2);
    }
}
