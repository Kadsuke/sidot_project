package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoTypeCommune.
 */
@Entity
@Table(name = "ref_geo_type_commune")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoTypeCommune implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "type_name")
    private String typeName;

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

    public String getTypeName() {
        return typeName;
    }

    public RefGeoTypeCommune typeName(String typeName) {
        this.typeName = typeName;
        return this;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public RefGeoCommune getCommune() {
        return commune;
    }

    public RefGeoTypeCommune commune(RefGeoCommune refGeoCommune) {
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
        if (!(o instanceof RefGeoTypeCommune)) {
            return false;
        }
        return id != null && id.equals(((RefGeoTypeCommune) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoTypeCommune{" +
            "id=" + getId() +
            ", typeName='" + getTypeName() + "'" +
            "}";
    }
}
