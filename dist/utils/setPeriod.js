"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
// Utilisation de la fonction pour générer les années de 1993 à 2023
const setFilteredByPeriod = (sets, firstYear, lastYear) => {
    const setFiltered = sets.filter((set) => ((0, date_fns_1.isBefore)((0, date_fns_1.toDate)(set.released_at), (0, date_fns_1.toDate)(`${Number(lastYear) + 1}-01-01`))
        && (0, date_fns_1.isAfter)((0, date_fns_1.toDate)(set.released_at), (0, date_fns_1.toDate)(`${Number(firstYear) - 1}-12-31`))));
    return setFiltered;
};
exports.default = setFilteredByPeriod;
//# sourceMappingURL=setPeriod.js.map