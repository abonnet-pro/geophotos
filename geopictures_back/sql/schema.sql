create table if not exists utilisateur
(
    id       bigserial
    constraint utilisateur_pk
    primary key,
    created  timestamp,
    updated  timestamp,

    nom      varchar(255) not null unique,
    email    varchar(255) not null unique,
    passowrd varchar(255) unique,
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
    code    varchar(255) not null,
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