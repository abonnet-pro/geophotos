package com.geopictures.models.mappers;

import com.geopictures.models.dtos.joueur.JoueurDTO;
import com.geopictures.models.entities.Joueur;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JoueurMapper {
    JoueurMapper INSTANCE = Mappers.getMapper( JoueurMapper.class );

    JoueurDTO joueurToDto(Joueur entity);
}
