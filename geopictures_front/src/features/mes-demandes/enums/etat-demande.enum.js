export const EtatDemande = {
    EN_ATTENTE: "EN_ATTENTE",
    ACCEPTE : "ACCEPTE",
    REFUSE : "REFUSE",
    ANNULE : "ANNULE",
    TOUS : "TOUS"
}

export function getEtatDemandeLibelle(etatDemande) {
    switch (etatDemande) {
        case EtatDemande.EN_ATTENTE: return 'En attente';
        case EtatDemande.ACCEPTE: return 'Accepté';
        case EtatDemande.REFUSE: return 'Refusé';
        case EtatDemande.ANNULE: return 'Annulé';
        case EtatDemande.TOUS: return 'Tous';
    }
}