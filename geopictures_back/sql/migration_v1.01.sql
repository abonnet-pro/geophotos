alter table demande_photo add column difficulte varchar(255);
alter table demande_photo add column libelle varchar(255);
alter table demande_photo add column indice varchar(255);
alter table demande_photo add column latitude varchar(255);
alter table demande_photo add column longitude varchar(255);
alter table demande_photo add column commentaire varchar(255);

alter table demande_zone add column image varchar(255);
alter table demande_zone add column commentaire varchar(255);

alter table utilisateur add column google_id varchar(255);

alter table utilisateur add column date_derniere_connexion timestamp;
alter table utilisateur add column raison_suspension varchar(255);
alter table utilisateur add column date_suspension timestamp;

alter table gadget_boutique add column en_vente boolean;

alter table avatar_boutique alter column prix type int;
alter table titre_boutique alter column prix type int;
alter table gadget_boutique alter column prix type int;
alter table bordure_boutique alter column prix type int;