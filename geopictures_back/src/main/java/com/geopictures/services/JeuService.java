package com.geopictures.services;

import com.geopictures.controllers.UtilisateurHolder;
import com.geopictures.models.dtos.photo.PhotoDTO;
import com.geopictures.models.entities.Photo;
import com.geopictures.models.entities.PhotoJoueur;
import com.geopictures.models.entities.Utilisateur;
import com.geopictures.models.mappers.PhotoMapper;
import com.geopictures.models.pojos.Coordonnees;
import com.geopictures.repositories.PhotoRepository;
import com.geopictures.services.resemble.analysis.ResembleAnalysis;
import com.geopictures.services.resemble.analysis.ResembleAnalysisOptions;
import com.geopictures.services.resemble.analysis.ResembleAnalysisResults;
import com.geopictures.services.resemble.analysis.ResembleAnaylsisOptionsTemplates;
import com.geopictures.services.resemble.parser.ResembleParser;
import com.geopictures.services.resemble.parser.ResembleParserData;
import com.geopictures.services.resemble.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Service
public class JeuService extends UtilisateurHolder {

    private final int DISTANCE_VALIDATION_SUCCES_GPS = 50;
    private final Double SCORE_VALIDATION_SUCCES_GLOBALE = 80D;

    @Autowired
    private UploaderService uploaderService;

    @Autowired
    private PhotoRepository photoRepository;

    @Value("${upload.files}")
    private String pathResource;

    @Autowired
    private PhotoMapper photoMapper;

    @Autowired
    private JoueurService joueurService;

    public PhotoDTO getRessemblance(MultipartFile file, Long photoId, Coordonnees coordonnees) throws Exception {
        Optional<Photo> photoOpt = photoRepository.findById(photoId);
        Utilisateur utilisateur = utilisateur();

        if(!photoOpt.isPresent()) {
            throw new Exception("Photo à jouer invalide");
        }

        Photo photo = photoOpt.get();

        if(utilisateur.getJoueur().getPhotosJoues().stream().anyMatch(photoJoueur -> photoJoueur.getPhoto().getId().equals(photoId))) {
            throw new Exception("Photo déjà jouée");
        }

        String photoJouee = uploaderService.uploadFile(file);

        if(photoJouee.isEmpty()) {
            throw new Exception("Photo jouée invalide");
        }

        PhotoJoueur photoJoueur = calculScore(photo, photoJouee);
        calculSuccess(photoJoueur, coordonnees);
        joueurService.updateJoueurInformations(photoJoueur, utilisateur().getJoueur());

        photo.getPhotosJoues().add(photoJoueur);
        photo = photoRepository.save(photo);

        return photoMapper.toDtoWithPhotoJoueur(photo, photoJoueur);
    }

    public PhotoJoueur calculScore(Photo photo, String photoJouee) throws IOException {
        String dirRessource = new File(pathResource).getAbsolutePath();
        File imgFile1 = new File(dirRessource + File.separator + photo.getImage());
        File imgFile2 = new File(dirRessource + File.separator + photoJouee);

        BufferedImage img1 = ImageUtils.readImage(imgFile1);
        BufferedImage img2 = ImageUtils.readImage(imgFile2);

        ResembleAnalysisOptions options = ResembleAnaylsisOptionsTemplates.ignoringAntialiasing();
        ResembleAnalysisResults results = new ResembleAnalysis(options).analyseImages(img1, img2);
        ResembleParserData dataResult = ResembleParser.parse(results.getOutputImage());

        return PhotoJoueur.builder()
                .joueur(utilisateur().getJoueur())
                .photo(photo)
                .imageJoue(photoJouee)
                .score(BigDecimal.valueOf(100D - results.getMismatchPercentage()).setScale(2, RoundingMode.FLOOR))
                .succesGps(false)
                .succesGlobale(false)
                .build();
    }

    private void calculSuccess(PhotoJoueur photoJoueur, Coordonnees coordonnees) {
        Coordonnees coordonneesPhoto = photoJoueur.getPhoto().getCoordonnes();

        Double distanceMetre = Coordonnees.getDistanceEnMetre(coordonneesPhoto, coordonnees);

        photoJoueur.setSuccesGps(distanceMetre.intValue() <= DISTANCE_VALIDATION_SUCCES_GPS);
        photoJoueur.setSuccesGlobale(photoJoueur.getSuccesGps() && photoJoueur.getScore().doubleValue() >= SCORE_VALIDATION_SUCCES_GLOBALE);
    }
}
