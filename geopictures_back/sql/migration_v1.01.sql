alter table demande_photo add column difficulte varchar(255);
alter table demande_photo add column libelle varchar(255);
alter table demande_photo add column indice varchar(255);
alter table demande_photo add column latitude varchar(255);
alter table demande_photo add column longitude varchar(255);
alter table demande_photo add column commentaire varchar(255);

alter table demande_zone add column image varchar(255);

alter table utilisateur add column google_id varchar(255);