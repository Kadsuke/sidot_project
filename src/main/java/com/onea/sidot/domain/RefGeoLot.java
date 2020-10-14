package com.onea.sidot.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RefGeoLot.
 */
@Entity
@Table(name = "ref_geo_lot")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RefGeoLot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "lot_name")
    private String lotName;

    @OneToOne
    @JoinColumn(unique = true)
    private RefGeoParcelle parcelle;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLotName() {
        return lotName;
    }

    public RefGeoLot lotName(String lotName) {
        this.lotName = lotName;
        return this;
    }

    public void setLotName(String lotName) {
        this.lotName = lotName;
    }

    public RefGeoParcelle getParcelle() {
        return parcelle;
    }

    public RefGeoLot parcelle(RefGeoParcelle refGeoParcelle) {
        this.parcelle = refGeoParcelle;
        return this;
    }

    public void setParcelle(RefGeoParcelle refGeoParcelle) {
        this.parcelle = refGeoParcelle;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RefGeoLot)) {
            return false;
        }
        return id != null && id.equals(((RefGeoLot) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RefGeoLot{" +
            "id=" + getId() +
            ", lotName='" + getLotName() + "'" +
            "}";
    }
}
