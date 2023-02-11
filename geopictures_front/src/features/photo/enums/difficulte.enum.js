export const Difficulte = {
    TOUTES: "TOUTES",
    FACILE : "FACILE",
    NORMAL : "NORMAL",
    DIFFICILE : "DIFFICILE",
    EXTREME : "EXTREME",
}

export function getDifficulteLibelle(difficulte) {
    switch (difficulte) {
        case Difficulte.TOUTES: return 'Toutes';
        case Difficulte.FACILE: return 'Facile';
        case Difficulte.NORMAL: return 'Normal';
        case Difficulte.DIFFICILE: return 'Difficile';
        case Difficulte.EXTREME: return 'Extrême';
    }
}

export function getDifficulteColor(difficulte) {
    switch (difficulte) {
        case Difficulte.FACILE: return '#007714';
        case Difficulte.NORMAL: return '#6c6c6c';
        case Difficulte.DIFFICILE: return '#891f04';
        case Difficulte.EXTREME: return '#6f00b6';
    }
}