package com.geopictures.models.mappers;

import com.geopictures.models.dtos.boutique.BordureBoutiqueDTO;
import com.geopictures.models.entities.Bordure;
import com.geopictures.models.entities.BordureBoutique;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BordureBoutiqueMapper {

    public BordureBoutiqueDTO bordureBoutiqueToDto(BordureBoutique entity, List<Bordure> borduresJoueur) {
        Optional<Bordure> optBordure = borduresJoueur.stream().filter(bordure -> bordure.getId().equals(entity.getBordure().getId())).findFirst();

        return BordureBoutiqueDTO.builder()
                .boutiqueId(entity.getId())
                .bordureId(entity.getBordure().getId())
                .image(entity.getBordure().getImage())
                .prix(entity.getPrix())
                .possede(optBordure.isPresent())
                .build();
    }
}
