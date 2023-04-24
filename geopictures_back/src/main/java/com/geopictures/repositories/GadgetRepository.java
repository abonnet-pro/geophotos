package com.geopictures.repositories;

import com.geopictures.models.entities.Gadget;
import com.geopictures.models.enums.GadgetCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GadgetRepository extends JpaRepository<Gadget, Long> {
    Gadget findByCode(GadgetCode code);
}
