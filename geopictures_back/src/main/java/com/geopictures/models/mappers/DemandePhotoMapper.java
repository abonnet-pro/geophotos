package com.geopictures.models.mappers;

import com.geopictures.models.dtos.collaboration.DemandeDTO;
import com.geopictures.models.entities.DemandePhoto;
import com.geopictures.models.enums.TypeDemande;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DemandePhotoMapper {
    DemandePhotoMapper INSTANCE = Mappers.getMapper( DemandePhotoMapper.class );

    @Mapping(source = "entity.created", target = "dateDemande")
    @Mapping(source = "entity.titre", target = "libelle")
    @Mapping(constant = "PHOTO", target = "typeDemande")
    DemandeDTO demandePhotoToDto(DemandePhoto entity);
}
