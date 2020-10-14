package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoLotTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoLot.class);
        RefGeoLot refGeoLot1 = new RefGeoLot();
        refGeoLot1.setId(1L);
        RefGeoLot refGeoLot2 = new RefGeoLot();
        refGeoLot2.setId(refGeoLot1.getId());
        assertThat(refGeoLot1).isEqualTo(refGeoLot2);
        refGeoLot2.setId(2L);
        assertThat(refGeoLot1).isNotEqualTo(refGeoLot2);
        refGeoLot1.setId(null);
        assertThat(refGeoLot1).isNotEqualTo(refGeoLot2);
    }
}
