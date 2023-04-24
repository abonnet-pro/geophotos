package com.geopictures.models.entities;

import com.geopictures.models.enums.RegionCode;
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
@Table(name="region")
public class Region {
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

    @OneToMany(mappedBy = "region", cascade = CascadeType.REMOVE)
    private Set<Zone> zones;

    @PrePersist
    public void onPrePersit() {
        setCreated(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdated(LocalDateTime.now());
    }
}
