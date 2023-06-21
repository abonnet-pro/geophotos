package com.geopictures.models.entities;

import com.geopictures.models.enums.Difficulte;
import com.geopictures.models.enums.EtatDemande;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="demande_photo")
public class DemandePhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="created")
    private LocalDateTime created;
    @Column(name="updated")
    private LocalDateTime updated;

    @ManyToOne
    @JoinColumn(name="joueur_id")
    private Joueur joueur;
    @ManyToOne
    @JoinColumn(name="zone_id")
    private Zone zone;

    @Column(name="image")
    private String image;
    @Column(name="etat")
    @Enumerated(EnumType.STRING)
    private EtatDemande etatDemande;
    @Column(name="difficulte")
    @Enumerated(EnumType.STRING)
    private Difficulte difficulte;
    @Column(name="libelle")
    private String libelle;
    @Column(name="indice")
    private String indice;
    @Column(name="latitude")
    private String latitude;
    @Column(name="longitude")
    private String longitude;
    @Column(name="commentaire")
    private String commentaire;

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
