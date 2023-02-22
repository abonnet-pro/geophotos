package com.geopictures.seeder;

import com.geopictures.models.entities.*;
import com.geopictures.models.enums.Difficulte;
import com.geopictures.models.enums.RegionCode;
import com.geopictures.models.enums.Role;
import com.geopictures.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Component
public class PhotoDataLoader implements CommandLineRunner {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private JoueurRepository joueurRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Override
    public void run(String... args) {
        if(utilisateurRepository.findByNom("Geopictures") == null) {
            initUtilisateur();
        }

        if(photoRepository.count() == 0) {
            initPhotos();
        }
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
        Optional<Joueur> joueurOpt = joueurRepository.findById(36L);

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
}
