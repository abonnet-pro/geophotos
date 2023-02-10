package com.geopictures.models.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="photo_joueur")
public class PhotoJoueur {
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
    @JoinColumn(name="photo_id")
    private Photo photo;

    @Column(name="image")
    private String imageJoue;
    @Column(name="score")
    private Integer score;
    @Column(name="succes_gps")
    private Boolean succesGps;
    @Column(name="succes_globale")
    private Boolean succesGlobale;

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
