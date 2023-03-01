package com.geopictures.models.entities;

import com.geopictures.models.enums.Difficulte;
import com.geopictures.models.pojos.Coordonnees;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="created")
    private LocalDateTime created;
    @Column(name="updated")
    private LocalDateTime updated;

    @Column(name="image")
    private String image;
    @Enumerated(EnumType.STRING)
    @Column(name="difficulte")
    private Difficulte difficulte;
    @Column(name="date_publication")
    private LocalDateTime datePublication;
    @Column(name="latitude")
    private String latitude;
    @Column(name="longitude")
    private String longitude;
    @Column(name="titre")
    private String titre;
    @Column(name="indice")
    private String indice;

    @ManyToOne
    @JoinColumn(name="zone_id")
    private Zone zone;
    @ManyToOne
    @JoinColumn(name="joueur_id")
    private Joueur titulaire;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "photo")
    private Set<PhotoJoueur> photosJoues = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "photo")
    private Set<GadgetPhotoJoueur> gadgetsUtilisesPhoto = new HashSet<>();

    public Coordonnees getCoordonnes() {
        return Coordonnees.builder()
                .latitude(new BigDecimal(this.latitude))
                .longitude(new BigDecimal(this.longitude))
                .build();
    }

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
