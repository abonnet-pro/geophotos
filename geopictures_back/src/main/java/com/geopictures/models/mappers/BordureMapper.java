package com.geopictures.models.mappers;

import com.geopictures.models.dtos.bordure.BordureDTO;
import com.geopictures.models.entities.Bordure;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BordureMapper {
    BordureMapper INSTANCE = Mappers.getMapper( BordureMapper.class );

    BordureDTO bordureToDto(Bordure entity);
}
