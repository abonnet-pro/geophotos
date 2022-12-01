package com.geopictures.models.mappers;

import com.geopictures.models.dtos.avatar.AvatarDTO;
import com.geopictures.models.entities.Avatar;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AvatarMapper {
    AvatarMapper INSTANCE = Mappers.getMapper( AvatarMapper.class );

    AvatarDTO avatarToDto(Avatar entity);
}
