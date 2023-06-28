package com.geopictures.services;

import com.geopictures.controllers.ProfilController;
import com.geopictures.controllers.UtilisateurHolder;
import com.geopictures.models.dtos.classement.ClassementLigneDTO;
import com.geopictures.models.dtos.profil.ProfilCarteVisiteDTO;
import com.geopictures.models.dtos.profil.ProfilDTO;
import com.geopictures.models.dtos.profil.SaveProfilDTO;
import com.geopictures.models.entities.*;
import com.geopictures.models.mappers.AvatarMapper;
import com.geopictures.models.mappers.BordureMapper;
import com.geopictures.models.mappers.GadgetMapper;
import com.geopictures.models.mappers.TitreMapper;
import com.geopictures.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfilService extends UtilisateurHolder {

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private AvatarRepository avatarRepository;

    @Autowired
    private BordureRepository bordureRepository;

    @Autowired
    private TitreRepository titreRepository;

    @Autowired
    private JoueurRepository joueurRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public ProfilDTO getProfil() {
        return buildDto(utilisateur());
    }

    public ProfilCarteVisiteDTO getCarteVisiteJoueur(Long utilisateurId) throws Exception {

        Optional<Utilisateur> optUtilisateur = utilisateurRepository.findById(utilisateurId);
        if(!optUtilisateur.isPresent()) {
            throw new Exception("Joueur introuvable");
        }

        Utilisateur utilisateur = optUtilisateur.get();

        return ProfilCarteVisiteDTO.builder()
                .nom(utilisateur.getNom())
                .niveau(utilisateur.getJoueur().getNiveau())
                .avatarActif(AvatarMapper.INSTANCE.avatarToDto(utilisateur.getJoueur().getAvatarActif()))
                .bordureActive(BordureMapper.INSTANCE.bordureToDto(utilisateur.getJoueur().getBordureActif()))
                .titreActif(TitreMapper.INSTANCE.titreToDto(utilisateur.getJoueur().getTitreActif()))
                .build();
    }

    public ProfilDTO saveProfil(SaveProfilDTO saveProfilDTO) throws Exception {
        Utilisateur utilisateur = utilisateur();

        saveAvatar(utilisateur, saveProfilDTO.getAvatarIdActif());
        saveBordure(utilisateur, saveProfilDTO.getBordureIdActive());
        saveTitre(utilisateur, saveProfilDTO.getTitreIdActif());

        return buildDto(utilisateur);
    }

    private void saveBordure(Utilisateur utilisateur, Long bordureId) throws Exception {
        if(bordureId != null) {
            Optional<Bordure> optBordure = bordureRepository.findById(bordureId);

            if(!optBordure.isPresent()) {
                throw new Exception("Bordure introuvable");
            }

            if(utilisateur.getJoueur().getBordures().stream().noneMatch(bordure -> bordure.getId().equals(bordureId))) {
                throw new Exception("Vous ne possédez pas cette bordure");
            }

            utilisateur.getJoueur().setBordureActif(optBordure.get());
        } else {
            utilisateur.getJoueur().setBordureActif(null);
        }

        joueurRepository.save(utilisateur.getJoueur());
    }

    private void saveAvatar(Utilisateur utilisateur, Long avatarId) throws Exception {
        if(avatarId == null) {
            throw new Exception("Avatar obligatoire");
        }

        Optional<Avatar> optAvatar = avatarRepository.findById(avatarId);

        if(!optAvatar.isPresent()) {
            throw new Exception("Avatar introuvable");
        }

        List<Avatar> avatars = avatarService.getAllAvatarFree();
        avatars.addAll(utilisateur.getJoueur().getAvatars());

        if(avatars.stream().noneMatch(avatar -> avatar.getId().equals(optAvatar.get().getId()))) {
            throw new Exception("Vous ne possédez pas cette avatar");
        }

        utilisateur.getJoueur().setAvatarActif(optAvatar.get());

        joueurRepository.save(utilisateur.getJoueur());
    }

    private void saveTitre(Utilisateur utilisateur, Long titreId) throws Exception {
        if(titreId != null) {
            Optional<Titre> optTitre = titreRepository.findById(titreId);

            if(!optTitre.isPresent()) {
                throw new Exception("Titre introuvable");
            }

            if(utilisateur.getJoueur().getTitres().stream().noneMatch(titre -> titre.getId().equals(titreId))) {
                throw new Exception("Vous ne possédez pas ce titre");
            }

            utilisateur.getJoueur().setTitreActif(optTitre.get());
        } else {
            utilisateur.getJoueur().setTitreActif(null);
        }

        joueurRepository.save(utilisateur.getJoueur());
    }

    private ProfilDTO buildDto(Utilisateur utilisateur) {
        List<Avatar> avatars = avatarService.getAllAvatarFree();
        avatars.addAll(utilisateur.getJoueur().getAvatars());

        return ProfilDTO.builder()
                .avatarActif(AvatarMapper.INSTANCE.avatarToDto(utilisateur.getJoueur().getAvatarActif()))
                .nom(utilisateur.getNom())
                .niveau(utilisateur.getJoueur().getNiveau())
                .bordureActive(BordureMapper.INSTANCE.bordureToDto(utilisateur.getJoueur().getBordureActif()))
                .titreActif(TitreMapper.INSTANCE.titreToDto(utilisateur.getJoueur().getTitreActif()))
                .mesAvatars(avatars.stream().map(AvatarMapper.INSTANCE::avatarToDto).collect(Collectors.toList()))
                .mesBordures(utilisateur.getJoueur().getBordures().stream().sorted(Comparator.comparing(Bordure::getId)).map(BordureMapper.INSTANCE::bordureToDto).collect(Collectors.toList()))
                .mesTitres(utilisateur.getJoueur().getTitres().stream().sorted(Comparator.comparing(Titre::getId)).map(TitreMapper.INSTANCE::titreToDto).collect(Collectors.toList()))
                .mesGadgets(utilisateur.getJoueur().getMesGadgets().stream().map(GadgetMapper.INSTANCE::gadgetToDto).collect(Collectors.toList()))
                .build();
    }
}
