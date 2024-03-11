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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const cards_exports_1 = __importDefault(require("../bdd/cards_exports"));
const mongoService = {
    connect: (db) => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://localhost/local");
    }),
    close: () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }),
    getLastSetSaved: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield cards_exports_1.default.aggregate([
            {
                $sort: { releaseDate: -1 },
            },
            {
                $project: { releaseDate: 1 }
            }
        ]).limit(1).exec();
        return result[0].releaseDate;
    }),
    deleteAfter: (date) => __awaiter(void 0, void 0, void 0, function* () {
        const deleted = yield cards_exports_1.default.deleteMany({ releaseDate: { "$gt": date } });
        return deleted;
    }),
    saveDate: (datas) => __awaiter(void 0, void 0, void 0, function* () {
        yield cards_exports_1.default.create(datas)
            .then(doc => {
            console.log(`Nouveau sets ajoutée (${datas.length}):`, doc);
        })
            .catch(err => {
            console.error('Erreur lors de l\'ajout :', err);
        });
    })
};
exports.default = mongoService;
//# sourceMappingURL=mongoService.js.map