package com.geopictures.models.mappers;

import com.geopictures.models.dtos.region.RegionDTO;
import com.geopictures.models.entities.Region;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RegionMapper {
    RegionMapper INSTANCE = Mappers.getMapper( RegionMapper.class );

    RegionDTO regionToDto(Region entity);
}
