package com.geopictures.services;

import com.geopictures.controllers.UtilisateurHolder;
import com.geopictures.models.dtos.boutique.*;
import com.geopictures.models.entities.*;
import com.geopictures.models.mappers.AvatarBoutiqueMapper;
import com.geopictures.models.mappers.BordureBoutiqueMapper;
import com.geopictures.models.mappers.GadgetBoutiqueMapper;
import com.geopictures.models.mappers.TitreBoutiqueMapper;
import com.geopictures.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class BoutiqueService extends UtilisateurHolder {

    @Autowired
    private GadgetBoutiqueRepository gadgetBoutiqueRepository;

    @Autowired
    private TitreBoutiqueRepository titreBoutiqueRepository;

    @Autowired
    private BordureBoutiqueRepository bordureBoutiqueRepository;

    @Autowired
    private AvatarBoutiqueRepository avatarBoutiqueRepository;

    @Autowired
    private TitreBoutiqueMapper titreBoutiqueMapper;

    @Autowired
    private AvatarBoutiqueMapper avatarBoutiqueMapper;

    @Autowired
    private BordureBoutiqueMapper bordureBoutiqueMapper;

    @Autowired
    private JoueurRepository joueurRepository;

    @Autowired
    private GadgetJoueurRepository gadgetJoueurRepository;

    public BoutiqueDTO getBoutique() {
        List<GadgetBoutique> gadgetsBoutique = gadgetBoutiqueRepository.findAllByEnVente(true);
        List<TitreBoutique> titresBoutique = titreBoutiqueRepository.findAll();
        List<BordureBoutique> borduresBoutique = bordureBoutiqueRepository.findAll();
        List<AvatarBoutique> avatarsBoutique = avatarBoutiqueRepository.findAll();

        List<GadgetBoutiqueDTO> gadgetsBoutiqueDTO = gadgetsBoutique.stream().map(GadgetBoutiqueMapper.INSTANCE::gadgetBoutiqueToDto).sorted(Comparator.comparingInt(GadgetBoutiqueDTO::getPrix)).collect(Collectors.toList());
        List<TitreBoutiqueDTO> titresBoutiqueDTO = titresBoutique.stream().map(titreBoutique -> titreBoutiqueMapper.titreBoutiqueToDto(titreBoutique, new ArrayList<>(utilisateur().getJoueur().getTitres()))).sorted(Comparator.comparingInt(TitreBoutiqueDTO::getPrix)).collect(Collectors.toList());
        List<BordureBoutiqueDTO> borduresBoutiqueDTO = borduresBoutique.stream().map(bordureBoutique -> bordureBoutiqueMapper.bordureBoutiqueToDto(bordureBoutique, new ArrayList<>(utilisateur().getJoueur().getBordures()))).collect(Collectors.toList());
        List<AvatarBoutiqueDTO> avatarsBoutiqueDTO = avatarsBoutique.stream().map(titreBoutique -> avatarBoutiqueMapper.avatarBoutiqueToDto(titreBoutique, new ArrayList<>(utilisateur().getJoueur().getAvatars()))).collect(Collectors.toList());

        return BoutiqueDTO.builder()
                .avatarsBoutique(avatarsBoutiqueDTO)
                .borduresBoutique(borduresBoutiqueDTO)
                .titresBoutique(titresBoutiqueDTO)
                .gadgtesBoutique(gadgetsBoutiqueDTO)
                .build();
    }

    public void achatBoutique(AchatBoutiqueRequest achatBoutiqueRequest) throws Exception {
        switch(achatBoutiqueRequest.getTypeAchatBoutique()) {
            case AVATAR:
                achatAvatarBoutique(achatBoutiqueRequest);
                break;
            case BORDURE:
                achatBordureBoutique(achatBoutiqueRequest);
                break;
            case TITRE:
                achatTitreBoutique(achatBoutiqueRequest);
                break;
            case GADGET:
                achatGadgetBoutique(achatBoutiqueRequest);
                break;
        }
    }

    private void achatAvatarBoutique(AchatBoutiqueRequest achatBoutiqueRequest) throws Exception {
        Optional<AvatarBoutique> optAvatarBoutique = avatarBoutiqueRepository.findById(achatBoutiqueRequest.getBoutiqueId());

        if(!optAvatarBoutique.isPresent()) {
            throw new Exception("Achat boutique impossible");
        }

        AvatarBoutique avatarBoutique = optAvatarBoutique.get();
        Joueur joueur = utilisateur().getJoueur();

        if(joueur.getPointsBoutique() < avatarBoutique.getPrix()) {
            throw new Exception("Vous n'avez pas assez de points boutique");
        }

        Optional<Avatar> optAvatarPossede = utilisateur().getJoueur().getAvatars().stream().filter(avatar -> avatar.getId().equals(avatarBoutique.getAvatar().getId())).findFirst();

        if(optAvatarPossede.isPresent()) {
            throw new Exception("Avatar deja possédé");
        }

        joueur.setPointsBoutique(joueur.getPointsBoutique() - avatarBoutique.getPrix());
        joueur.getAvatars().add(avatarBoutique.getAvatar());
        joueurRepository.save(joueur);
    }

    private void achatTitreBoutique(AchatBoutiqueRequest achatBoutiqueRequest) throws Exception {
        Optional<TitreBoutique> optionalTitreBoutique = titreBoutiqueRepository.findById(achatBoutiqueRequest.getBoutiqueId());

        if(!optionalTitreBoutique.isPresent()) {
            throw new Exception("Achat boutique impossible");
        }

        TitreBoutique titreBoutique = optionalTitreBoutique.get();
        Joueur joueur = utilisateur().getJoueur();

        if(joueur.getPointsBoutique() < titreBoutique.getPrix()) {
            throw new Exception("Vous n'avez pas assez de points boutique");
        }

        Optional<Titre> optTitrePossede = utilisateur().getJoueur().getTitres().stream().filter(titre -> titre.getId().equals(titreBoutique.getTitre().getId())).findFirst();

        if(optTitrePossede.isPresent()) {
            throw new Exception("Titre deja possédé");
        }

        joueur.setPointsBoutique(joueur.getPointsBoutique() - titreBoutique.getPrix());
        joueur.getTitres().add(titreBoutique.getTitre());
        joueurRepository.save(joueur);
    }

    private void achatBordureBoutique(AchatBoutiqueRequest achatBoutiqueRequest) throws Exception {
        Optional<BordureBoutique> optionalBordureBoutique = bordureBoutiqueRepository.findById(achatBoutiqueRequest.getBoutiqueId());

        if(!optionalBordureBoutique.isPresent()) {
            throw new Exception("Achat boutique impossible");
        }

        BordureBoutique bordureBoutique = optionalBordureBoutique.get();
        Joueur joueur = utilisateur().getJoueur();

        if(joueur.getPointsBoutique() < bordureBoutique.getPrix()) {
            throw new Exception("Vous n'avez pas assez de points boutique");
        }

        Optional<Bordure> optBordurePossede = utilisateur().getJoueur().getBordures().stream().filter(bordure -> bordure.getId().equals(bordureBoutique.getBordure().getId())).findFirst();

        if(optBordurePossede.isPresent()) {
            throw new Exception("Bordure deja possédé");
        }

        joueur.setPointsBoutique(joueur.getPointsBoutique() - bordureBoutique.getPrix());
        joueur.getBordures().add(bordureBoutique.getBordure());
        joueurRepository.save(joueur);
    }

    private void achatGadgetBoutique(AchatBoutiqueRequest achatBoutiqueRequest) throws Exception {
        Optional<GadgetBoutique> optionalGadgetBoutique = gadgetBoutiqueRepository.findById(achatBoutiqueRequest.getBoutiqueId());

        if(!optionalGadgetBoutique.isPresent()) {
            throw new Exception("Achat boutique impossible");
        }

        GadgetBoutique gadgetBoutique = optionalGadgetBoutique.get();

        if(!gadgetBoutique.getEnVente()) {
            throw new Exception("Achat boutique impossible");
        }

        Joueur joueur = utilisateur().getJoueur();

        if(joueur.getPointsBoutique() < gadgetBoutique.getPrix()) {
            throw new Exception("Vous n'avez pas assez de points boutique");
        }

        joueur.setPointsBoutique(joueur.getPointsBoutique() - gadgetBoutique.getPrix());

        Set<GadgetJoueur> mesGadgets = joueur.getMesGadgets();
        GadgetJoueur gadgetJoueur = mesGadgets.stream().filter(gj -> gj.getGadget().getCode().equals(gadgetBoutique.getGadget().getCode())).findFirst().orElse(null);

        if(gadgetJoueur == null) {
            gadgetJoueur = GadgetJoueur.builder()
                    .quantite(0)
                    .gadget(gadgetBoutique.getGadget())
                    .joueur(utilisateur().getJoueur())
                    .build();
        }

        gadgetJoueur.setQuantite(gadgetJoueur.getQuantite() + 1);

        gadgetJoueurRepository.save(gadgetJoueur);
    }
}
