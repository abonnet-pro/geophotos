package com.geopictures.models.mappers;

import com.geopictures.models.dtos.titre.TitreDTO;
import com.geopictures.models.entities.Titre;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TitreMapper {
    TitreMapper INSTANCE = Mappers.getMapper( TitreMapper.class );

    TitreDTO titreToDto(Titre entity);
}
