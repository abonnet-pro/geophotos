export const EtatDemande = {
    EN_ATTENTE: "EN_ATTENTE",
    ACCEPTE : "ACCEPTE",
    REFUSE : "REFUSE",
    ANNULE : "ANNULE",
}

export function getEtatDemandeLibelle(etatDemande) {
    switch (etatDemande) {
        case EtatDemande.EN_ATTENTE: return 'En attente';
        case EtatDemande.ACCEPTE: return 'Accepté';
        case EtatDemande.REFUSE: return 'Refusé';
        case EtatDemande.ANNULE: return 'Annulé';
    }
}