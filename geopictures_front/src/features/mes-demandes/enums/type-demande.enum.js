export const TypeDemande = {
    ZONE: "ZONE",
    PHOTO : "PHOTO",
}

export function getTypeDemandeLibelle(typeDemande) {
    switch (typeDemande) {
        case TypeDemande.ZONE: return 'Zone';
        case TypeDemande.PHOTO: return 'Photo';
    }
}