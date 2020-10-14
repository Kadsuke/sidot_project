package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoSecteur.
 */
@Entity
@Table(name = "ref_geo_secteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoSecteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "secteur_name")
    private String secteurName;

    @OneToOne
    @JoinColumn(unique = true)
    private RefGeoLocalite localite;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSecteurName() {
        return secteurName;
    }

    public RefGeoSecteur secteurName(String secteurName) {
        this.secteurName = secteurName;
        return this;
    }

    public void setSecteurName(String secteurName) {
        this.secteurName = secteurName;
    }

    public RefGeoLocalite getLocalite() {
        return localite;
    }

    public RefGeoSecteur localite(RefGeoLocalite refGeoLocalite) {
        this.localite = refGeoLocalite;
        return this;
    }

    public void setLocalite(RefGeoLocalite refGeoLocalite) {
        this.localite = refGeoLocalite;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RefGeoSecteur)) {
            return false;
        }
        return id != null && id.equals(((RefGeoSecteur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoSecteur{" +
            "id=" + getId() +
            ", secteurName='" + getSecteurName() + "'" +
            "}";
    }
}
