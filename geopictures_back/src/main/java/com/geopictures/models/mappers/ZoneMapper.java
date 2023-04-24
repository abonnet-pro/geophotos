package com.geopictures.models.mappers;

import com.geopictures.models.dtos.zone.ZoneDTO;
import com.geopictures.models.entities.Zone;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ZoneMapper {
    ZoneMapper INSTANCE = Mappers.getMapper( ZoneMapper.class );

    ZoneDTO zoneToDto(Zone entity);
}
