package com.onea.sidot.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.onea.sidot.web.rest.TestUtil;

public class RefGeoSecteurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RefGeoSecteur.class);
        RefGeoSecteur refGeoSecteur1 = new RefGeoSecteur();
        refGeoSecteur1.setId(1L);
        RefGeoSecteur refGeoSecteur2 = new RefGeoSecteur();
        refGeoSecteur2.setId(refGeoSecteur1.getId());
        assertThat(refGeoSecteur1).isEqualTo(refGeoSecteur2);
        refGeoSecteur2.setId(2L);
        assertThat(refGeoSecteur1).isNotEqualTo(refGeoSecteur2);
        refGeoSecteur1.setId(null);
        assertThat(refGeoSecteur1).isNotEqualTo(refGeoSecteur2);
    }
}
