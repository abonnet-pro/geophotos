package com.geopictures.models.entities;

import com.geopictures.models.enums.GadgetCode;
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
@Table(name="gadget")
public class Gadget {
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
    @Enumerated(EnumType.STRING)
    private GadgetCode code;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gadget")
    private Set<GadgetJoueur> gadgetDetenus = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gadget")
    private Set<GadgetPhotoJoueur> gadgetUtilisePhotos = new HashSet<>();

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
