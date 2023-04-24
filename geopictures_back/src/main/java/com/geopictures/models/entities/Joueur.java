package com.geopictures.models.entities;

import com.geopictures.models.enums.Role;
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
@Table(name="joueur")
public class Joueur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="created")
    private LocalDateTime created;
    @Column(name="updated")
    private LocalDateTime updated;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="utilisateur_id", referencedColumnName = "id")
    private Utilisateur utilisateur;
    @Column(name="niveau")
    private int niveau;
    @Column(name="experience")
    private int experience;
    @Column(name="prochain_niveau")
    private int prochainNiveau;
    @Column(name="points_boutique")
    private int pointsBoutique;

    @ManyToOne
    @JoinColumn(name="avatar_actif", referencedColumnName = "id")
    private Avatar avatarActif;

    @ManyToOne
    @JoinColumn(name="bordure_actif", referencedColumnName = "id")
    private Bordure bordureActif;

    @ManyToOne
    @JoinColumn(name="titre_actif", referencedColumnName = "id")
    private Titre titreActif;

    @ManyToMany
    @JoinTable(
            name = "titre_joueur",
            joinColumns = @JoinColumn(name = "joueur_id"),
            inverseJoinColumns = @JoinColumn(name = "titre_id"))
    private Set<Titre> titres;
    @ManyToMany
    @JoinTable(
            name = "bordure_joueur",
            joinColumns = @JoinColumn(name = "joueur_id"),
            inverseJoinColumns = @JoinColumn(name = "bordure_id"))
    private Set<Bordure> bordures;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "avatar_joueur",
            joinColumns = @JoinColumn(name = "joueur_id"),
            inverseJoinColumns = @JoinColumn(name = "avatar_id"))
    private Set<Avatar> avatars;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "joueur", fetch = FetchType.EAGER)
    private Set<GadgetPhotoJoueur> gadgetsUtilisesPhotos  = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "joueur", fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<PhotoJoueur> photosJoues  = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "joueur", fetch = FetchType.EAGER)
    private Set<GadgetJoueur> mesGadgets  = new HashSet<>();

    @OneToMany(mappedBy = "titulaire", cascade = CascadeType.ALL)
    private Set<Photo> photoCollaboration  = new HashSet<>();

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
