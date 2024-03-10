import { isAfter, isBefore, toDate } from "date-fns";
import { Set } from "scryfall-sdk";

// Utilisation de la fonction pour générer les années de 1993 à 2023
const setFilteredByPeriod = (sets: Array<Set>, firstYear: number, lastYear: number) => {
    const setFiltered = sets.filter((set) => (
        isBefore(toDate(set.released_at), toDate(`${Number(lastYear) + 1}-01-01`)) 
        && isAfter(toDate(set.released_at),toDate(`${Number(firstYear) - 1}-12-31`))
    ))

    return setFiltered
};

export default setFilteredByPeriod