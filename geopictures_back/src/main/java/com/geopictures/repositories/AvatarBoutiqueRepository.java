package com.geopictures.repositories;

import com.geopictures.models.entities.AvatarBoutique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvatarBoutiqueRepository extends JpaRepository<AvatarBoutique, Long> {
}
