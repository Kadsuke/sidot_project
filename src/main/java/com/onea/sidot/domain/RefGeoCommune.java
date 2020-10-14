package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoCommune.
 */
@Entity
@Table(name = "ref_geo_commune")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoCommune implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "commune_name")
    private String communeName;

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

    public String getCommuneName() {
        return communeName;
    }

    public RefGeoCommune communeName(String communeName) {
        this.communeName = communeName;
        return this;
    }

    public void setCommuneName(String communeName) {
        this.communeName = communeName;
    }

    public RefGeoLocalite getLocalite() {
        return localite;
    }

    public RefGeoCommune localite(RefGeoLocalite refGeoLocalite) {
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
        if (!(o instanceof RefGeoCommune)) {
            return false;
        }
        return id != null && id.equals(((RefGeoCommune) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoCommune{" +
            "id=" + getId() +
            ", communeName='" + getCommuneName() + "'" +
            "}";
    }
}
