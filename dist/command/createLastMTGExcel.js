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
const date_fns_1 = require("date-fns");
const mongoService_1 = __importDefault(require("../api/services/mongoService"));
const mtgService_1 = __importDefault(require("../api/services/mtgService"));
const excelService_1 = __importDefault(require("../api/services/excelService"));
const createLastMTGExcels = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoService_1.default.connect();
    const lastUpdate = yield mongoService_1.default.getLastSetSaved();
    const sets = yield mtgService_1.default.getAllSets();
    const lastSet = sets.filter((set) => ((0, date_fns_1.isBefore)((0, date_fns_1.toDate)(set.released_at), new Date())
        && (0, date_fns_1.isAfter)((0, date_fns_1.toDate)(set.released_at), (0, date_fns_1.toDate)(lastUpdate))));
    yield excelService_1.default.createLastSets(lastSet);
    yield mongoService_1.default.close();
    process.exit(0);
});
exports.default = createLastMTGExcels;
//# sourceMappingURL=createLastMTGExcel.js.map