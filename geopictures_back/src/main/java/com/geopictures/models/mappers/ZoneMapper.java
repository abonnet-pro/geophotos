package com.geopictures.models.mappers;

import com.geopictures.models.dtos.zone.ZoneDTO;
import com.geopictures.models.entities.Joueur;
import com.geopictures.models.entities.PhotoJoueur;
import com.geopictures.models.entities.Zone;
import com.geopictures.repositories.PhotoJoueurRepository;
import com.geopictures.repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ZoneMapper {

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private PhotoJoueurRepository photoJoueurRepository;

    public ZoneDTO zoneToDto(Zone entity, Joueur joueur) {

        List<PhotoJoueur> photosJoues = photoJoueurRepository.findAllByJoueur(joueur);
        List<PhotoJoueur> photosJouesZone = photosJoues.stream().filter(photoJoueur -> photoJoueur.getPhoto().getZone().getId().equals(entity.getId())).collect(Collectors.toList());

        return ZoneDTO.builder()
                .id(entity.getId())
                .regionCode(entity.getRegion().getCode())
                .image(entity.getImage())
                .libelle(entity.getLibelle())
                .nombrePhotosDisponibles(photoRepository.countAllByZone(entity))
                .nombrePhotosJoues((long) photosJouesZone.size())
                .build();
    }
}
