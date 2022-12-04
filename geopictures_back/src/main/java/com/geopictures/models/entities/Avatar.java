package com.geopictures.models.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="avatar")
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="created")
    private LocalDateTime created;
    @Column(name="updated")
    private LocalDateTime updated;

    @Column(name="free")
    private boolean free;
    @Column(name="image")
    private String image;

    @OneToMany(mappedBy = "avatarActif")
    Set<Joueur> joueursActif;

    @ManyToMany(mappedBy = "avatars")
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
