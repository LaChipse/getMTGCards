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
const mtgService_1 = __importDefault(require("../services/mtgService"));
const generateYears_1 = __importDefault(require("../utils/generateYears"));
const excelService_1 = __importDefault(require("../services/excelService"));
const date_fns_1 = require("date-fns");
const createMTGExcels = (firstYear, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Début: ${(0, date_fns_1.format)(new Date(), 'HH:mm:SS')}`);
    const sets = yield mtgService_1.default.getAllSets();
    let period = [];
    if (options.endYear) {
        period = (0, generateYears_1.default)(Number(firstYear), Number(options.endYear));
    }
    else {
        period = [Number(firstYear)];
    }
    yield excelService_1.default.saveCardsBySets(sets, period);
    console.log(`Fin: ${(0, date_fns_1.format)(new Date(), 'HH:mm:SS')}`);
});
exports.default = createMTGExcels;
//# sourceMappingURL=createMTGExcel.js.map