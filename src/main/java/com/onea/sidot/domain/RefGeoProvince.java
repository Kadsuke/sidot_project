package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoProvince.
 */
@Entity
@Table(name = "ref_geo_province")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoProvince implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "province_name")
    private String provinceName;

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

    public String getProvinceName() {
        return provinceName;
    }

    public RefGeoProvince provinceName(String provinceName) {
        this.provinceName = provinceName;
        return this;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public RefGeoCommune getCommune() {
        return commune;
    }

    public RefGeoProvince commune(RefGeoCommune refGeoCommune) {
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
        if (!(o instanceof RefGeoProvince)) {
            return false;
        }
        return id != null && id.equals(((RefGeoProvince) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoProvince{" +
            "id=" + getId() +
            ", provinceName='" + getProvinceName() + "'" +
            "}";
    }
}
