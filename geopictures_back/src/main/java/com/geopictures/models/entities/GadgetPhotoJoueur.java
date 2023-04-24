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
@Table(name="gadget_photo_joueur")
public class GadgetPhotoJoueur {
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
    @JoinColumn(name="gadget_id")
    private Gadget gadget;
    @ManyToOne
    @JoinColumn(name="photo_id")
    private Photo photo;

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
