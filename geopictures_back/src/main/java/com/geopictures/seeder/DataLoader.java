package com.geopictures.seeder;

import com.geopictures.models.entities.*;
import com.geopictures.models.enums.Difficulte;
import com.geopictures.models.enums.RegionCode;
import com.geopictures.models.enums.Role;
import com.geopictures.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    ResourceLoader resourceLoader;

    @Value("${upload.files}")
    private String pathToUpload;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private JoueurRepository joueurRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private RegionRepository regionRepository;

    @Override
    public void run(String... args) throws IOException {
        initDirPhotoJoueur();

        if(zoneRepository.count() == 0) {
            initZones();
        }

        if(utilisateurRepository.findByNom("Geopictures") == null) {
            initUtilisateur();
        }

        if(photoRepository.count() == 0) {
            initPhotos();
        }
    }

    private void initZones() {
        Region region = regionRepository.findByCode(RegionCode.PROVENCE_ALPE_COTE_AZUR.getCode());

        Zone zone1 = Zone.builder()
                .libelle("Marseille")
                .image("marseille.jpg")
                .region(region)
                .build();

        zoneRepository.save(zone1);

        Zone zone2 = Zone.builder()
                .libelle("Esimed")
                .image("esimed.png")
                .region(region)
                .build();

        zoneRepository.save(zone2);

        Zone zone3 = Zone.builder()
                .libelle("Nice")
                .region(region)
                .build();

        zoneRepository.save(zone3);
    }

    private void initUtilisateur() {
        Utilisateur admin = Utilisateur.builder()
                .nom("Geopictures")
                .actif(true)
                .role(Role.ADMIN)
                .build();

        Joueur joueurAdmin = Joueur.builder()
                .utilisateur(admin)
                .niveau(1)
                .prochainNiveau(100)
                .build();

        joueurRepository.save(joueurAdmin);
    }

    private void initPhotos() {
        Zone marseille = zoneRepository.findByLibelle("Marseille");
        Utilisateur admin = utilisateurRepository.findByNom("Geopictures");
        Optional<Joueur> joueurOpt = joueurRepository.findById(40L);

        if(!joueurOpt.isPresent()) {
            return;
        }

        Photo photo1 = Photo.builder()
                .titre("Vue Chambre")
                .image("test_1.jpg")
                .difficulte(Difficulte.DIFFICILE)
                .datePublication(LocalDateTime.now())
                .coordonnees("43.338084,5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .photosJoues(new HashSet<>())
                .build();

        PhotoJoueur photoJoueur1 = PhotoJoueur.builder()
                .joueur(joueurOpt.get())
                .photo(photo1)
                .imageJoue("test_1.jpg")
                .score(new BigDecimal(100))
                .succesGps(true)
                .succesGlobale(true)
                .build();

        photo1.getPhotosJoues().add(photoJoueur1);

        photoRepository.save(photo1);

        Photo photo2 = Photo.builder()
                .titre("Vue Chambre 2")
                .image("test_1.jpg")
                .difficulte(Difficulte.FACILE)
                .datePublication(LocalDateTime.now())
                .coordonnees("43.338084,5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo2);

        Photo photo3 = Photo.builder()
                .titre("Vue Chambre 3")
                .image("test_1.jpg")
                .difficulte(Difficulte.NORMAL)
                .datePublication(LocalDateTime.now())
                .coordonnees("43.338084,5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .photosJoues(new HashSet<>())
                .build();

        PhotoJoueur photoJoueur3 = PhotoJoueur.builder()
                .joueur(joueurOpt.get())
                .photo(photo3)
                .imageJoue("test_1.jpg")
                .score(new BigDecimal("68.52"))
                .succesGps(false)
                .succesGlobale(false)
                .build();

        photo3.getPhotosJoues().add(photoJoueur3);

        photoRepository.save(photo3);

        Photo photo4 = Photo.builder()
                .titre("Vue Chambre 4")
                .image("test_1.jpg")
                .difficulte(Difficulte.DIFFICILE)
                .datePublication(LocalDateTime.now())
                .coordonnees("43.338084,5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo4);

        Photo photo5 = Photo.builder()
                .titre("Vue Chambre 5")
                .image("test_1.jpg")
                .difficulte(Difficulte.EXTREME)
                .datePublication(LocalDateTime.now())
                .coordonnees("43.338084,5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo5);

        Photo photo6 = Photo.builder()
                .titre("Vue Chambre 4")
                .image("test_1.jpg")
                .difficulte(Difficulte.DIFFICILE)
                .datePublication(LocalDateTime.now())
                .coordonnees("43.338084,5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .photosJoues(new HashSet<>())
                .build();

        PhotoJoueur photoJoueur6 = PhotoJoueur.builder()
                .joueur(joueurOpt.get())
                .photo(photo6)
                .imageJoue("test_1.jpg")
                .score(new BigDecimal("22.36"))
                .succesGps(false)
                .succesGlobale(false)
                .build();

        photo6.getPhotosJoues().add(photoJoueur6);

        photoRepository.save(photo6);
    }

    private void initDirPhotoJoueur() throws IOException {
        File dirUpload = new File(pathToUpload);
        boolean success = true;

        if(!dirUpload.exists()) {
            success = dirUpload.mkdir();
        }

        if(success) {
            File zoneEsimed = resourceLoader.getResource("classpath:/seeder/esimed.png").getFile();
            File zoneMarseille = resourceLoader.getResource("classpath:/seeder/marseille.jpg").getFile();
            File photoJeuTest = resourceLoader.getResource("classpath:/seeder/test_1.jpg").getFile();

            uploadFile(zoneEsimed);
            uploadFile(zoneMarseille);
            uploadFile(photoJeuTest);
        }
    }

    private void uploadFile(File file) throws IOException {
        byte[] bytes = Files.readAllBytes(file.toPath());
        File dir = new File(pathToUpload);
        File serverFile = new File(dir.getAbsolutePath() + File.separator + file.getName());

        BufferedOutputStream stream = new BufferedOutputStream(Files.newOutputStream(serverFile.toPath()));
        stream.write(bytes);
        stream.close();
    }
}
