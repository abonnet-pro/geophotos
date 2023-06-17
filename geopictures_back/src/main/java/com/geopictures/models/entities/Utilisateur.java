package com.geopictures.models.entities;

import com.geopictures.models.enums.Role;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="utilisateur")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="created")
    private LocalDateTime created;
    @Column(name="updated")
    private LocalDateTime updated;

    @Column(name="nom")
    private String nom;
    @Column(name="email")
    private String email;
    @Column(name="password")
    private String password;
    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(name="actif")
    private boolean actif;
    @Column(name="google_id")
    private String googleId;

    @OneToOne(mappedBy = "utilisateur")
    private Joueur joueur;

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
