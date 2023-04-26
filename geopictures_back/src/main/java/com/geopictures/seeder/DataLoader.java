package com.geopictures.seeder;

import com.geopictures.models.entities.*;
import com.geopictures.models.enums.Difficulte;
import com.geopictures.models.enums.GadgetCode;
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

    @Autowired
    private AvatarRepository avatarRepository;

    @Autowired
    private BordureRepository bordureRepository;

    @Autowired
    private TitreRepository titreRepository;

    @Autowired
    private GadgetRepository gadgetRepository;

    @Override
    public void run(String... args) throws IOException {
        initDirPhotoJoueur();

        if(avatarRepository.count() == 0) {
            initAvatar();
        }

        if(bordureRepository.count() == 0) {
            initBordure();
        }

        if(titreRepository.count() == 0) {
            initTitre();
        }

        if(regionRepository.count() == 0) {
            initRegions();
        }

        if(zoneRepository.count() == 0) {
            initZones();
        }

        if(utilisateurRepository.findByNom("Geopictures") == null) {
            initUtilisateur();
        }

        Optional<Joueur> joueurOpt = joueurRepository.findById(44L);

        if(!joueurOpt.isPresent()) {
            return;
        }

        if(photoRepository.count() == 0) {
            initPhotos(joueurOpt.get());
        }

        if(gadgetRepository.count() == 0) {
            initGadget(joueurOpt.get());
        }
    }

    private void initGadget(Joueur joueur) {
        Gadget gps = Gadget.builder()
                .code(GadgetCode.GPS)
                .libelle("Le gadget vous indique la position Gps exacte de la photo")
                .gadgetDetenus(new HashSet<>())
                .build();

        GadgetJoueur gadgetJoueur = GadgetJoueur.builder()
                .gadget(gps)
                .joueur(joueur)
                .quantite(2)
                .build();

        gps.getGadgetDetenus().add(gadgetJoueur);

        gadgetRepository.save(gps);

        Gadget direction = Gadget.builder()
                .code(GadgetCode.DIRECTION)
                .libelle("Le gadget vous indique la direction à suivre à partir de votre position")
                .gadgetDetenus(new HashSet<>())
                .build();

        GadgetJoueur gadgetJoueur2 = GadgetJoueur.builder()
                .gadget(direction)
                .joueur(joueur)
                .quantite(2)
                .build();

        direction.getGadgetDetenus().add(gadgetJoueur2);

        gadgetRepository.save(direction);

        Gadget distance = Gadget.builder()
                .code(GadgetCode.DISTANCE)
                .libelle("Le gadget vous indique la distance vous séparant de la photo")
                .gadgetDetenus(new HashSet<>())
                .build();

        GadgetJoueur gadgetJoueur3 = GadgetJoueur.builder()
                .gadget(distance)
                .joueur(joueur)
                .quantite(2)
                .build();

        distance.getGadgetDetenus().add(gadgetJoueur3);

        gadgetRepository.save(distance);

        Gadget succes = Gadget.builder()
                .code(GadgetCode.SUCCESS_ZONE)
                .libelle("Le gadget vous indique si vous vous trouver dans la zone du succes Gps")
                .gadgetDetenus(new HashSet<>())
                .build();

        GadgetJoueur gadgetJoueur4 = GadgetJoueur.builder()
                .gadget(succes)
                .joueur(joueur)
                .quantite(2)
                .build();

        succes.getGadgetDetenus().add(gadgetJoueur4);

        gadgetRepository.save(succes);

        Gadget top = Gadget.builder()
                .code(GadgetCode.TOP_1)
                .libelle("Le gadget vous montre la photo prise par le joueur ayant fait le meilleur score sur la photo")
                .gadgetDetenus(new HashSet<>())
                .build();

        GadgetJoueur gadgetJoueur5 = GadgetJoueur.builder()
                .gadget(top)
                .joueur(joueur)
                .quantite(2)
                .build();

        top.getGadgetDetenus().add(gadgetJoueur5);

        gadgetRepository.save(top);

        Gadget indice = Gadget.builder()
                .code(GadgetCode.INDICE)
                .libelle("Le gadget vous donne un indice sur la photo (si il en existe un)")
                .gadgetDetenus(new HashSet<>())
                .build();

        GadgetJoueur gadgetJoueur6 = GadgetJoueur.builder()
                .gadget(indice)
                .joueur(joueur)
                .quantite(2)
                .build();

        indice.getGadgetDetenus().add(gadgetJoueur6);

        gadgetRepository.save(indice);

        Gadget recommencer = Gadget.builder()
                .code(GadgetCode.RECOMMENCER)
                .libelle("Le gadget vous permet de reprendre une photo déjà prise (Attention l'ancienne photo sera ecrasé)")
                .gadgetDetenus(new HashSet<>())
                .build();

        GadgetJoueur gadgetJoueur7 = GadgetJoueur.builder()
                .gadget(recommencer)
                .joueur(joueur)
                .quantite(2)
                .build();

        recommencer.getGadgetDetenus().add(gadgetJoueur7);

        gadgetRepository.save(recommencer);
    }

    private void initAvatar() {
        for(int i = 1; i <= 50; i++) {
            Avatar avatar = Avatar.builder()
                    .image("avatar/avatar_f" + i + ".png")
                    .free(i%2 == 0)
                    .build();
            avatarRepository.save(avatar);
        }
    }

    private void initTitre() {
        Titre supporter = Titre.builder()
                .libelle("Supporter de geopictures")
                .code("supp")
                .build();
        titreRepository.save(supporter);

        Titre fan = Titre.builder()
                .libelle("Fan de geopictures")
                .code("fan")
                .build();
        titreRepository.save(fan);

        Titre actionnaire = Titre.builder()
                .libelle("Actionnaire de geopictures")
                .code("actionnaire")
                .build();
        titreRepository.save(actionnaire);
    }

    private void initBordure() {
        Bordure gold = Bordure.builder()
                .libelle("gold")
                .code("gold")
                .image("bordure/bordure_gold.png")
                .build();
        bordureRepository.save(gold);

        Bordure silver = Bordure.builder()
                .libelle("silver")
                .code("silver")
                .image("bordure/bordure_silver.png")
                .build();
        bordureRepository.save(silver);

        Bordure bronze = Bordure.builder()
                .libelle("bronze")
                .code("bronze")
                .image("bordure/bordure_bronze.png")
                .build();
        bordureRepository.save(bronze);

        Bordure platine = Bordure.builder()
                .libelle("platine")
                .code("platine")
                .image("bordure/bordure_platine.png")
                .build();
        bordureRepository.save(platine);

        Bordure saphir = Bordure.builder()
                .libelle("saphir")
                .code("saphir")
                .image("bordure/bordure_saphir.png")
                .build();
        bordureRepository.save(saphir);
    }

    private void initRegions() {
        Region hdf = Region.builder()
                .code("HDF")
                .libelle("Hauts-de-France")
                .build();
        regionRepository.save(hdf);

        Region idf = Region.builder()
                .code("IDF")
                .libelle("Ile-de-France")
                .build();
        regionRepository.save(idf);

        Region nor = Region.builder()
                .code("NOR")
                .libelle("Normandie")
                .build();
        regionRepository.save(nor);

        Region bre = Region.builder()
                .code("BRE")
                .libelle("Bretagne")
                .build();
        regionRepository.save(bre);

        Region pdl = Region.builder()
                .code("PDL")
                .libelle("Pays de la loire")
                .build();
        regionRepository.save(pdl);

        Region cvl = Region.builder()
                .code("CVL")
                .libelle("Centre Val de Loire")
                .build();
        regionRepository.save(cvl);

        Region bfc = Region.builder()
                .code("BFC")
                .libelle("Bourgogne-Franche-Comté")
                .build();
        regionRepository.save(bfc);

        Region ara = Region.builder()
                .code("ARA")
                .libelle("Auverge-Rhône-Alpes")
                .build();
        regionRepository.save(ara);

        Region naq = Region.builder()
                .code("NAQ")
                .libelle("Nouvelle-Aquitaine")
                .build();
        regionRepository.save(naq);

        Region occ = Region.builder()
                .code("OCC")
                .libelle("Occitanie")
                .build();
        regionRepository.save(occ);

        Region paca = Region.builder()
                .code("PACA")
                .libelle("Provence-Alpes-Côte d''Azur")
                .build();
        regionRepository.save(paca);

        Region cor = Region.builder()
                .code("COR")
                .libelle("Corse")
                .build();
        regionRepository.save(cor);
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

        Zone zone4 = Zone.builder()
                .libelle("Maison Anthony")
                .region(region)
                .build();

        zoneRepository.save(zone4);

        Zone zone5 = Zone.builder()
                .libelle("Maison Florian")
                .region(region)
                .build();

        zoneRepository.save(zone5);
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

    private void initPhotos(Joueur joueur) {
        Zone marseille = zoneRepository.findByLibelle("Marseille");
        Zone maisonAnthony = zoneRepository.findByLibelle("Maison Anthony");
        Utilisateur admin = utilisateurRepository.findByNom("Geopictures");

        Photo photo1 = Photo.builder()
                .titre("Vue Chambre")
                .image("test_1.jpg")
                .difficulte(Difficulte.DIFFICILE)
                .datePublication(LocalDateTime.now())
                .latitude("43.338084")
                .longitude("5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .photosJoues(new HashSet<>())
                .build();

        PhotoJoueur photoJoueur1 = PhotoJoueur.builder()
                .joueur(joueur)
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
                .latitude("43.338084")
                .longitude("5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo2);

        Photo photo3 = Photo.builder()
                .titre("Vue Chambre 3")
                .image("test_1.jpg")
                .difficulte(Difficulte.NORMAL)
                .datePublication(LocalDateTime.now())
                .latitude("43.338084")
                .longitude("5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .photosJoues(new HashSet<>())
                .build();

        PhotoJoueur photoJoueur3 = PhotoJoueur.builder()
                .joueur(joueur)
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
                .latitude("43.338084")
                .longitude("5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo4);

        Photo photo5 = Photo.builder()
                .titre("Vue Chambre 5")
                .image("test_1.jpg")
                .difficulte(Difficulte.EXTREME)
                .datePublication(LocalDateTime.now())
                .latitude("43.338084")
                .longitude("5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo5);

        Photo photo6 = Photo.builder()
                .titre("Vue Chambre 4")
                .image("test_1.jpg")
                .difficulte(Difficulte.DIFFICILE)
                .datePublication(LocalDateTime.now())
                .latitude("43.338084")
                .longitude("5.406201")
                .zone(marseille)
                .titulaire(admin.getJoueur())
                .photosJoues(new HashSet<>())
                .build();

        PhotoJoueur photoJoueur6 = PhotoJoueur.builder()
                .joueur(joueur)
                .photo(photo6)
                .imageJoue("test_1.jpg")
                .score(new BigDecimal("22.36"))
                .succesGps(false)
                .succesGlobale(false)
                .build();

        photo6.getPhotosJoues().add(photoJoueur6);

        photoRepository.save(photo6);

        Photo photo7 = Photo.builder()
                .titre("Mandala")
                .image("antho_1.jpg")
                .difficulte(Difficulte.FACILE)
                .datePublication(LocalDateTime.now())
                .latitude("52.9497586")
                .longitude("6.8170329")
                .zone(maisonAnthony)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo7);

        Photo photo8 = Photo.builder()
                .titre("Espace")
                .image("antho_2.jpg")
                .difficulte(Difficulte.NORMAL)
                .datePublication(LocalDateTime.now())
                .latitude("52.9497586")
                .longitude("6.8170329")
                .zone(maisonAnthony)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo8);

        Photo photo9 = Photo.builder()
                .titre("Ca tourne")
                .image("antho_3.jpg")
                .difficulte(Difficulte.EXTREME)
                .datePublication(LocalDateTime.now())
                .latitude("43.9497556")
                .longitude("4.8170224")
                .zone(maisonAnthony)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo9);

        Photo photo10 = Photo.builder()
                .titre("Vue chat")
                .image("antho_4.jpg")
                .difficulte(Difficulte.FACILE)
                .datePublication(LocalDateTime.now())
                .latitude("43.9497586")
                .longitude("4.8170329")
                .zone(maisonAnthony)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo10);

        Photo photo11 = Photo.builder()
                .titre("Contraste")
                .image("antho_5.jpg")
                .difficulte(Difficulte.DIFFICILE)
                .datePublication(LocalDateTime.now())
                .latitude("43.9497586")
                .longitude("4.8170329")
                .zone(maisonAnthony)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo11);

        Photo photo12 = Photo.builder()
                .titre("Carreaux")
                .image("antho_6.jpg")
                .difficulte(Difficulte.NORMAL)
                .datePublication(LocalDateTime.now())
                .latitude("43.9497586")
                .longitude("4.8170329")
                .zone(maisonAnthony)
                .titulaire(admin.getJoueur())
                .build();

        photoRepository.save(photo12);
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

            File antho1 = resourceLoader.getResource("classpath:/seeder/antho_1.jpg").getFile();
            File antho2 = resourceLoader.getResource("classpath:/seeder/antho_2.jpg").getFile();
            File antho3 = resourceLoader.getResource("classpath:/seeder/antho_3.jpg").getFile();
            File antho4 = resourceLoader.getResource("classpath:/seeder/antho_4.jpg").getFile();
            File antho5 = resourceLoader.getResource("classpath:/seeder/antho_5.jpg").getFile();
            File antho6 = resourceLoader.getResource("classpath:/seeder/antho_6.jpg").getFile();

            uploadFile(zoneEsimed);
            uploadFile(zoneMarseille);
            uploadFile(photoJeuTest);

            uploadFile(antho1);
            uploadFile(antho2);
            uploadFile(antho3);
            uploadFile(antho4);
            uploadFile(antho5);
            uploadFile(antho6);
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
