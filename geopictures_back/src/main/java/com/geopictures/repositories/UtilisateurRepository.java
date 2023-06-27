package com.geopictures.repositories;

import com.geopictures.models.entities.Utilisateur;
import com.geopictures.models.dtos.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByNom(String nom);

    Utilisateur findByEmail(String email);

    List<Utilisateur> findAllByRole(Role role);
}
