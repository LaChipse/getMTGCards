
// Utilisation de la fonction pour générer les années de 1993 à 2023
const generateYears = (firstYear: number, lastYear: number) => {
    const years: Array<number | null> = [];
    for (let year = firstYear; year <= lastYear; year++) {
        years.push(year);
    }
    return years;
};

export default generateYears