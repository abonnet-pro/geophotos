package com.geopictures.models.entities;

import com.geopictures.models.dtos.enums.EtatDemande;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="demande_zone")
public class DemandeZone {
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
    @JoinColumn(name="region_id")
    private Region region;

    @Column(name="image")
    private String image;
    @Column(name="etat")
    @Enumerated(EnumType.STRING)
    private EtatDemande etatDemande;
    @Column(name="libelle")
    private String libelle;
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
