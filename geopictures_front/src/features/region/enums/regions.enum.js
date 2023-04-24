export const Region = {
    HAUT_DE_FRANCE : 'HDF',
    GRAND_EST : 'GE',
    ILE_DE_FRANCE : 'IDF',
    NORMANDIE : 'NOR',
    BRETAGNE : 'BRE',
    PAYS_DE_LA_LOIRE : 'PDL',
    CENTRE_VAL_DE_LOIRE : 'CVL',
    BOURGOGNE_FRANCHE_COMTE : 'BFC',
    AUVERGNE_RHONE_ALPES : 'ARA',
    NOUVELLE_AQUITAINE : 'NAQ',
    OCCITANIE : 'OCC',
    PROVENCE_ALPE_COTE_AZUR : 'PACA',
    CORSE : 'COR',
}

export function RegionLibelle(region) {
    switch (region) {
        case Region.HAUT_DE_FRANCE: return 'Hauts-de-France';
        case Region.GRAND_EST: return 'Grand-Est';
        case Region.ILE_DE_FRANCE: return 'Ile-de-France';
        case Region.NORMANDIE: return 'Normandie';
        case Region.BRETAGNE: return 'Bretagne';
        case Region.PAYS_DE_LA_LOIRE: return 'Pays de la loire';
        case Region.CENTRE_VAL_DE_LOIRE: return 'Centre Val de Loire';
        case Region.BOURGOGNE_FRANCHE_COMTE: return 'Bourgogne-Franche-Comté';
        case Region.AUVERGNE_RHONE_ALPES: return 'Auverge-Rhône-Alpes';
        case Region.NOUVELLE_AQUITAINE: return 'Nouvelle-Aquitaine';
        case Region.OCCITANIE: return 'Occitanie';
        case Region.PROVENCE_ALPE_COTE_AZUR: return 'Provence-Alpes-Côte d\'Azur';
        case Region.CORSE: return 'Corse';
    }
}