package com.geopictures.repositories;

import com.geopictures.models.entities.BordureBoutique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BordureBoutiqueRepository extends JpaRepository<BordureBoutique, Long> {
}
