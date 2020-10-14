package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoSection.
 */
@Entity
@Table(name = "ref_geo_section")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoSection implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "section_name")
    private String sectionName;

    @OneToOne
    @JoinColumn(unique = true)
    private RefGeoLot lot;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSectionName() {
        return sectionName;
    }

    public RefGeoSection sectionName(String sectionName) {
        this.sectionName = sectionName;
        return this;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public RefGeoLot getLot() {
        return lot;
    }

    public RefGeoSection lot(RefGeoLot refGeoLot) {
        this.lot = refGeoLot;
        return this;
    }

    public void setLot(RefGeoLot refGeoLot) {
        this.lot = refGeoLot;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RefGeoSection)) {
            return false;
        }
        return id != null && id.equals(((RefGeoSection) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoSection{" +
            "id=" + getId() +
            ", sectionName='" + getSectionName() + "'" +
            "}";
    }
}
