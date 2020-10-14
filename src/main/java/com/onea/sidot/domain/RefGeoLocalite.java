package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoLocalite.
 */
@Entity
@Table(name = "ref_geo_localite")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoLocalite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "localite_name")
    private String localiteName;

    @OneToOne
    @JoinColumn(unique = true)
    private RefGeoCommune commune;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocaliteName() {
        return localiteName;
    }

    public RefGeoLocalite localiteName(String localiteName) {
        this.localiteName = localiteName;
        return this;
    }

    public void setLocaliteName(String localiteName) {
        this.localiteName = localiteName;
    }

    public RefGeoCommune getCommune() {
        return commune;
    }

    public RefGeoLocalite commune(RefGeoCommune refGeoCommune) {
        this.commune = refGeoCommune;
        return this;
    }

    public void setCommune(RefGeoCommune refGeoCommune) {
        this.commune = refGeoCommune;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RefGeoLocalite)) {
            return false;
        }
        return id != null && id.equals(((RefGeoLocalite) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoLocalite{" +
            "id=" + getId() +
            ", localiteName='" + getLocaliteName() + "'" +
            "}";
    }
}
