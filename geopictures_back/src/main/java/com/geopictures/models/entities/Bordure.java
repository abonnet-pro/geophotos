package com.geopictures.models.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="bordure")
public class Bordure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="created")
    private LocalDateTime created;
    @Column(name="updated")
    private LocalDateTime updated;

    @Column(name="libelle")
    private String libelle;
    @Column(name="code")
    private String code;
    @Column(name="image")
    private String image;

    @OneToMany(mappedBy = "bordureActif")
    Set<Joueur> joueursActif = new HashSet<>();

    @ManyToMany(mappedBy = "bordures")
    Set<Joueur> joueurs;

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
