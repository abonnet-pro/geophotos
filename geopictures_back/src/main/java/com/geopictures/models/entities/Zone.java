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
@Table(name="zone")
public class Zone {
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
    @Column(name="image")
    private String image;
    @ManyToOne
    @JoinColumn(name="region_id")
    private Region region;

    @OneToMany(mappedBy = "zone", cascade = CascadeType.REMOVE)
    private Set<Photo> photos = new HashSet<>();

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
