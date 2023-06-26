package com.geopictures.models.mappers;

import com.geopictures.models.dtos.collaboration.DemandeDTO;
import com.geopictures.models.entities.DemandeZone;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DemandeZoneMapper {
    DemandeZoneMapper INSTANCE = Mappers.getMapper( DemandeZoneMapper.class );

    @Mapping(source = "entity.created", target = "dateDemande")
    @Mapping(source = "entity.joueur.utilisateur.nom", target = "nomJoueur")
    @Mapping(source = "entity.region.libelle", target = "region")
    @Mapping(constant = "ZONE", target = "typeDemande")
    DemandeDTO demandeZoneToDto(DemandeZone entity);
}
