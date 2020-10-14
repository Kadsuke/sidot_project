package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoParcelle.
 */
@Entity
@Table(name = "ref_geo_parcelle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoParcelle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "parcelle_name")
    private String parcelleName;

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

    public String getParcelleName() {
        return parcelleName;
    }

    public RefGeoParcelle parcelleName(String parcelleName) {
        this.parcelleName = parcelleName;
        return this;
    }

    public void setParcelleName(String parcelleName) {
        this.parcelleName = parcelleName;
    }

    public RefGeoLot getLot() {
        return lot;
    }

    public RefGeoParcelle lot(RefGeoLot refGeoLot) {
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
        if (!(o instanceof RefGeoParcelle)) {
            return false;
        }
        return id != null && id.equals(((RefGeoParcelle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoParcelle{" +
            "id=" + getId() +
            ", parcelleName='" + getParcelleName() + "'" +
            "}";
    }
}
