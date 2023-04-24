export const TOUTES = "TOUTES";
export const DEJA_JOUE = "DEJA_JOUE";
export const A_JOUE = "A_JOUE";

export function getColorByScore(score) {
    if(score > 80) {
        return "#0e5900";
    }

    if(score > 50) {
        return "#a86004";
    }

    return "#980016";
}
