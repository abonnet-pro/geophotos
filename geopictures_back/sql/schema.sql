create table if not exists utilisateur
(
    id       bigserial
    constraint utilisateur_pk
    primary key,
    created  timestamp,
    updated  timestamp,

    email    varchar(255) unique,
    password varchar(255),
    role     varchar(255) not null,
    actif    boolean not null
    );

alter table utilisateur
    owner to postgres;

create table if not exists joueur
(
    id       bigserial
    constraint joueur_pk
    primary key,
    created timestamp,
    updated timestamp,

    utilisateur_id bigint not null,
    nom      varchar(255) not null unique,
    niveau int not null,
    experience int not null,
    prochain_niveau int not null,
    points_boutique int not null,
    constraint fk_joueur_utilisateur
    foreign key (utilisateur_id)
    references utilisateur(id)
);

alter table joueur
    owner to postgres;

create table if not exists avatar
(
    id       bigserial
    constraint avatar_pk
    primary key,
    created timestamp,
    updated timestamp,

    libelle varchar(255) NOT NULL,
    code    varchar(255) not null,
    image   varchar(255) NOT NULL
);

alter table avatar
    owner to postgres;

create table if not exists titre
(
    id       bigserial
    constraint titre_pk
    primary key,
    created timestamp,
    updated timestamp,

    libelle varchar(255) NOT NULL,
    code    varchar(255) not null
);

alter table titre
    owner to postgres;

create table if not exists bordure
(
    id       bigserial
    constraint bordure_pk
    primary key,
    created timestamp,
    updated timestamp,

    libelle varchar(255) NOT NULL,
    code    varchar(255) not null,
    image   varchar(255) NOT NULL
);

alter table bordure
    owner to postgres;

create table if not exists gadget
(
    id       bigserial
    constraint gadget_pk
    primary key,
    created timestamp,
    updated timestamp,

    libelle varchar(255) NOT NULL,
    code    varchar(255) not null,
    image   varchar(255) NOT NULL
);

alter table gadget
    owner to postgres;

create table if not exists avatar_joueur
(
    id       bigserial
    constraint avatar_joueur_pk
    primary key,
    created timestamp,
    updated timestamp,

    joueur_id bigint not null,
    avatar_id bigint not null,
    actif boolean not null,
    constraint fk_avatar_joueur_joueur
    foreign key (joueur_id)
    references joueur(id),
    constraint fk_avatar_joueur_avatar
    foreign key (avatar_id)
    references avatar(id)
    );

alter table avatar_joueur
    owner to postgres;

create table if not exists titre_joueur
(
    id       bigserial
    constraint titre_joueur_pk
    primary key,
    created timestamp,
    updated timestamp,

    joueur_id bigint not null,
    titre_id bigint not null,
    actif boolean not null,
    constraint fk_titre_joueur_joueur
    foreign key (joueur_id)
    references joueur(id),
    constraint fk_titre_joueur_titre
    foreign key (titre_id)
    references titre(id)
    );

alter table titre_joueur
    owner to postgres;

create table if not exists bordure_joueur
(
    id       bigserial
    constraint bordure_joueur_pk
    primary key,
    created timestamp,
    updated timestamp,

    joueur_id bigint not null,
    bordure_id bigint not null,
    actif boolean not null,
    constraint fk_bordure_joueur_joueur
    foreign key (joueur_id)
    references joueur(id),
    constraint fk_bordure_joueur_bordure
    foreign key (bordure_id)
    references bordure(id)
    );

alter table bordure_joueur
    owner to postgres;

create table if not exists gadget_joueur
(
    id       bigserial
    constraint gadget_joueur_pk
    primary key,
    created timestamp,
    updated timestamp,

    joueur_id bigint not null,
    gadget_id bigint not null,
    quantite int not null,
    constraint fk_gadget_joueur_joueur
    foreign key (joueur_id)
    references joueur(id),
    constraint fk_gadget_joueur_gadget
    foreign key (gadget_id)
    references gadget(id)
    );

alter table gadget_joueur
    owner to postgres;

create table if not exists region
(
    id       bigserial
    constraint region_pk
    primary key,
    created timestamp,
    updated timestamp,

    libelle varchar(255) NOT NULL
);

alter table region
    owner to postgres;

create table if not exists zone
(
    id       bigserial
    constraint zone_pk
    primary key,
    created timestamp,
    updated timestamp,

    libelle varchar(255) NOT NULL,
    region_id bigint not null,
    constraint fk_zone_region
    foreign key (region_id)
    references region(id)
);

alter table zone
    owner to postgres;

create table if not exists photo
(
    id       bigserial
        constraint photo_pk
            primary key,
    created timestamp,
    updated timestamp,

    zone_id bigint NOT NULL,
    joueur_id bigint not null,
    image varchar(255) not null,
    difficulte varchar(255) not null,
    date_publication date not null,
    constraint fk_photo_zone
        foreign key (zone_id)
            references zone(id),
    constraint fk_photo_joueur
        foreign key (joueur_id)
            references joueur(id)
);

alter table photo
    owner to postgres;

create table if not exists photo_joueur
(
    id       bigserial
    constraint photo_joueur_pk
    primary key,
    created timestamp,
    updated timestamp,

    joueur_id bigint NOT NULL,
    photo_id bigint not null,
    image varchar(255) not null,
    score int not null,
    succes_gps boolean not null,
    succes_globale boolean not null,
    constraint fk_photo_joueur_joueur
    foreign key (joueur_id)
    references joueur(id),
    constraint fk_photo_joueur_photo
    foreign key (photo_id)
    references photo(id)
    );

alter table photo_joueur
    owner to postgres;

create table if not exists avatar_boutique
(
    id       bigserial
    constraint avatar_boutique_pk
    primary key,
    created timestamp,
    updated timestamp,

    avatar_id bigint NOT NULL,
    prix int not null,
    constraint fk_avatar_boutique_avatar
    foreign key (avatar_id)
    references avatar(id)
);

alter table avatar_boutique
    owner to postgres;

create table if not exists titre_boutique
(
    id       bigserial
    constraint titre_boutique_pk
    primary key,
    created timestamp,
    updated timestamp,

    titre_id bigint NOT NULL,
    prix int not null,
    constraint fk_titre_boutique_titre
    foreign key (titre_id)
    references titre(id)
    );

alter table titre_boutique
    owner to postgres;

create table if not exists bordure_boutique
(
    id       bigserial
    constraint bordure_boutique_pk
    primary key,
    created timestamp,
    updated timestamp,

    bordure_id bigint NOT NULL,
    prix int not null,
    constraint fk_bordure_boutique_bordure
    foreign key (bordure_id)
    references bordure(id)
    );

alter table bordure_boutique
    owner to postgres;

create table if not exists gadget_boutique
(
    id       bigserial
    constraint gadget_boutique_pk
    primary key,
    created timestamp,
    updated timestamp,

    gadget_id bigint NOT NULL,
    prix int not null,
    constraint fk_gadget_boutique_gadget
    foreign key (gadget_id)
    references gadget(id)
    );

alter table gadget_boutique
    owner to postgres;

create table if not exists demande_zone
(
    id       bigserial
    constraint demande_zone_pk
    primary key,
    created timestamp,
    updated timestamp,

    joueur_id bigint NOT NULL,
    region_id bigint NOT NULL,
    libelle varchar(255) not null,
    etat varchar(255) not null,
    constraint fk_demande_zone_joueur
    foreign key (joueur_id)
    references joueur(id),
    constraint fk_demande_zone_region
    foreign key (region_id)
    references region(id)
    );

alter table demande_zone
    owner to postgres;

create table if not exists demande_photo
(
    id       bigserial
    constraint demande_photo_pk
    primary key,
    created timestamp,
    updated timestamp,

    joueur_id bigint NOT NULL,
    zone_id bigint NOT NULL,
    image varchar(255) not null,
    etat varchar(255) not null,
    constraint fk_demande_photo_joueur
    foreign key (joueur_id)
    references joueur(id),
    constraint fk_demande_photo_zone
    foreign key (zone_id)
    references zone(id)
    );

alter table demande_photo
    owner to postgres;