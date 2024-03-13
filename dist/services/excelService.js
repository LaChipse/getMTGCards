"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = __importDefault(require("exceljs"));
const date_fns_1 = require("date-fns");
const mtgService_1 = __importDefault(require("./mtgService"));
const mongoService_1 = __importDefault(require("./mongoService"));
const fs_1 = __importDefault(require("fs"));
const setPeriod_1 = __importDefault(require("../utils/setPeriod"));
const excelService = {
    saveCardsBySets: (sets, dates) => { var _a, dates_1, dates_1_1; return __awaiter(void 0, void 0, void 0, function* () {
        var _b, e_1, _c, _d, _e, e_2, _f, _g;
        try {
            for (_a = true, dates_1 = __asyncValues(dates); dates_1_1 = yield dates_1.next(), _b = dates_1_1.done, !_b; _a = true) {
                _d = dates_1_1.value;
                _a = false;
                const date = _d;
                const datasSaved = [];
                const directoryPath = `public/setsMTG/${date}`;
                fs_1.default.mkdirSync(directoryPath, { recursive: true });
                const setsByDate = (0, setPeriod_1.default)(sets, date, date);
                try {
                    for (var _h = true, setsByDate_1 = (e_2 = void 0, __asyncValues(setsByDate)), setsByDate_1_1; setsByDate_1_1 = yield setsByDate_1.next(), _e = setsByDate_1_1.done, !_e; _h = true) {
                        _g = setsByDate_1_1.value;
                        _h = false;
                        const set = _g;
                        const result = yield excelService.createExcels(set, directoryPath);
                        datasSaved.push(result);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_h && !_e && (_f = setsByDate_1.return)) yield _f.call(setsByDate_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                ;
                yield mongoService_1.default.saveItemsExported(datasSaved);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = dates_1.return)) yield _c.call(dates_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }); },
    createLastSets: (sets) => { var _a, sets_1, sets_1_1; return __awaiter(void 0, void 0, void 0, function* () {
        var _b, e_3, _c, _d;
        const datasSaved = [];
        try {
            for (_a = true, sets_1 = __asyncValues(sets); sets_1_1 = yield sets_1.next(), _b = sets_1_1.done, !_b; _a = true) {
                _d = sets_1_1.value;
                _a = false;
                const set = _d;
                const date = (0, date_fns_1.format)((0, date_fns_1.toDate)(set.released_at), "yyyy");
                const directoryPath = `public/setsMTG/${date}`;
                if (!fs_1.default.existsSync(directoryPath)) {
                    fs_1.default.mkdirSync(directoryPath, { recursive: true });
                }
                const result = yield excelService.createExcels(set, directoryPath);
                datasSaved.push(result);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = sets_1.return)) yield _c.call(sets_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        yield mongoService_1.default.saveItemsExported(datasSaved);
        return datasSaved.length;
    }); },
    createExcels: (set, path) => __awaiter(void 0, void 0, void 0, function* () {
        const cardsBySet = yield mtgService_1.default.getListeCardsBySet(set.code);
        const file = `${path}/${set.name.replace(/[&\/\\#,+() $~%.'":*?<>{}]/g, '_')}.xlsx`;
        // Création d'un nouveau workbook
        let workbook = new exceljs_1.default.Workbook();
        // Ajout d'une nouvelle feuille avec un nom
        const worksheet = workbook.addWorksheet(set.name.replace(/[&\/\\#,+() $~%.'":*?<>{}]/g, '_'));
        // Ajout d'un en-tête de colonne
        worksheet.columns = [
            { header: 'Id', key: 'id', width: 45 },
            { header: 'Nom', key: 'name', width: 45 },
            { header: 'Date de sortie', key: 'releasedAt', width: 20 },
            { header: 'Coût de mana', key: 'manaCost', width: 20 },
            { header: 'Coût converti de mana', key: 'cmc', width: 10 },
            { header: 'Type', key: 'typeLine', width: 50 },
            { header: 'Text', key: 'text', width: 50 },
            { header: 'Attaque', key: 'power', width: 10 },
            { header: 'Endurance', key: 'toughness', width: 10 },
            { header: 'Mots clés', key: 'keywords', width: 35 },
            { header: 'Extension', key: 'set', width: 10 },
            { header: 'Nom de l\'extension', key: 'setName', width: 40 },
            { header: 'Type de l\'extension', key: 'setType', width: 25 },
            { header: 'Rareté', key: 'rarity', width: 15 },
            { header: 'Artiste', key: 'artist', width: 20 },
        ];
        cardsBySet.forEach(cards => {
            var _a;
            worksheet.addRow([
                (cards === null || cards === void 0 ? void 0 : cards.id) || '',
                (cards === null || cards === void 0 ? void 0 : cards.name) || '',
                (cards === null || cards === void 0 ? void 0 : cards.released_at) || '',
                ((_a = cards === null || cards === void 0 ? void 0 : cards.mana_cost) === null || _a === void 0 ? void 0 : _a.replace('B', 'N').replace('U', 'Ble').replace('W', 'Bla').replace('G', 'V')) || '',
                (cards === null || cards === void 0 ? void 0 : cards.cmc) || '',
                (cards === null || cards === void 0 ? void 0 : cards.type_line) || '',
                (cards === null || cards === void 0 ? void 0 : cards.oracle_text) || '',
                Number(cards === null || cards === void 0 ? void 0 : cards.power) || '',
                Number(cards === null || cards === void 0 ? void 0 : cards.toughness) || '',
                (cards === null || cards === void 0 ? void 0 : cards.keywords.join(', ')) || '',
                (cards === null || cards === void 0 ? void 0 : cards.set) || '',
                (cards === null || cards === void 0 ? void 0 : cards.set_name) || '',
                (cards === null || cards === void 0 ? void 0 : cards.set_type) || '',
                (cards === null || cards === void 0 ? void 0 : cards.rarity) || '',
                (cards === null || cards === void 0 ? void 0 : cards.artist) || '',
            ]);
        });
        // Sauvegarde du fichier Excel sur le disque
        yield workbook.xlsx.writeFile(file);
        console.log('Fichier Excel créé avec succès !');
        return {
            id: set.id,
            setName: set.name,
            code: set.code,
            cardCount: set.card_count,
            releaseDate: set.released_at,
            type: set.set_type,
            updateDate: (0, date_fns_1.format)(new Date(), 'dd/MM/yyyy - HH:mm:ss')
        };
    })
};
exports.default = excelService;
//# sourceMappingURL=excelService.js.map