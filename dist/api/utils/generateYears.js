"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utilisation de la fonction pour générer les années de 1993 à 2023
const generateYears = (firstYear, lastYear) => {
    const years = [];
    for (let year = firstYear; year <= lastYear; year++) {
        years.push(year);
    }
    return years;
};
exports.default = generateYears;
//# sourceMappingURL=generateYears.js.map