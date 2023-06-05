package com.geopictures.models.mappers;

import com.geopictures.models.dtos.gadget.GadgetByTypeDTO;
import com.geopictures.models.entities.GadgetJoueur;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GadgetMapper {
    GadgetMapper INSTANCE = Mappers.getMapper( GadgetMapper.class );

    @Mapping(source = "entity.gadget.code", target = "code")
    @Mapping(source = "entity.gadget.libelle", target = "libelle")
    GadgetByTypeDTO gadgetToDto(GadgetJoueur entity);
}
