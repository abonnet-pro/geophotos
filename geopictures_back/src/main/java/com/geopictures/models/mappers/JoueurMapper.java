package com.geopictures.models.mappers;

import com.geopictures.models.dtos.accueil.AccueilDTO;
import com.geopictures.models.entities.Joueur;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JoueurMapper {
    JoueurMapper INSTANCE = Mappers.getMapper( JoueurMapper.class );

    AccueilDTO joueurToDto(Joueur entity);
}
