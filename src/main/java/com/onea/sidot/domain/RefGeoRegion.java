package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoRegion.
 */
@Entity
@Table(name = "ref_geo_region")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoRegion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "region_name")
    private String regionName;

    @OneToOne
    @JoinColumn(unique = true)
    private RefGeoProvince province;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegionName() {
        return regionName;
    }

    public RefGeoRegion regionName(String regionName) {
        this.regionName = regionName;
        return this;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public RefGeoProvince getProvince() {
        return province;
    }

    public RefGeoRegion province(RefGeoProvince refGeoProvince) {
        this.province = refGeoProvince;
        return this;
    }

    public void setProvince(RefGeoProvince refGeoProvince) {
        this.province = refGeoProvince;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RefGeoRegion)) {
            return false;
        }
        return id != null && id.equals(((RefGeoRegion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoRegion{" +
            "id=" + getId() +
            ", regionName='" + getRegionName() + "'" +
            "}";
    }
}
