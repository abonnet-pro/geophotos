package com.geopictures.models.mappers;

import com.geopictures.models.dtos.boutique.GadgetBoutiqueDTO;
import com.geopictures.models.entities.GadgetBoutique;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GadgetBoutiqueMapper {
    GadgetBoutiqueMapper INSTANCE = Mappers.getMapper( GadgetBoutiqueMapper.class );

    @Mapping(source = "entity.id", target = "boutiqueId")
    @Mapping(source = "entity.gadget.id", target = "gadgetId")
    @Mapping(source = "entity.gadget.code", target = "code")
    @Mapping(source = "entity.gadget.libelle", target = "libelle")
    GadgetBoutiqueDTO gadgetBoutiqueToDto(GadgetBoutique entity);
}
