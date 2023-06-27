package com.geopictures.models.mappers;

import com.geopictures.models.dtos.boutique.TitreBoutiqueDTO;
import com.geopictures.models.entities.Titre;
import com.geopictures.models.entities.TitreBoutique;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TitreBoutiqueMapper {

    public TitreBoutiqueDTO titreBoutiqueToDto(TitreBoutique entity, List<Titre> titresJoueur) {
        Optional<Titre> optTitre = titresJoueur.stream().filter(titre -> titre.getId().equals(entity.getTitre().getId())).findFirst();

        return TitreBoutiqueDTO.builder()
                .boutiqueId(entity.getId())
                .titreId(entity.getTitre().getId())
                .libelle(entity.getTitre().getLibelle())
                .prix(entity.getPrix())
                .possede(optTitre.isPresent())
                .build();
    }
}
