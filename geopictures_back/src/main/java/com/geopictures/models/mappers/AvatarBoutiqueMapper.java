package com.geopictures.models.mappers;

import com.geopictures.models.dtos.boutique.AvatarBoutiqueDTO;
import com.geopictures.models.entities.Avatar;
import com.geopictures.models.entities.AvatarBoutique;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AvatarBoutiqueMapper {

    public AvatarBoutiqueDTO avatarBoutiqueToDto(AvatarBoutique entity, List<Avatar> avatarsJoueur) {
        Optional<Avatar> optAvatar = avatarsJoueur.stream().filter(avatar -> avatar.getId().equals(entity.getAvatar().getId())).findFirst();

        return AvatarBoutiqueDTO.builder()
                .boutiqueId(entity.getId())
                .avatarId(entity.getAvatar().getId())
                .image(entity.getAvatar().getImage())
                .prix(entity.getPrix())
                .possede(optAvatar.isPresent())
                .build();
    }
}
