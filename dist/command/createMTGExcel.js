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
const mongoService_1 = __importDefault(require("../api/services/mongoService"));
const mtgService_1 = __importDefault(require("../api/services/mtgService"));
const generateYears_1 = __importDefault(require("../utils/generateYears"));
const excelService_1 = __importDefault(require("../api/services/excelService"));
const createMTGExcels = (firstYear, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoService_1.default.connect();
    const sets = yield mtgService_1.default.getAllSets();
    let period = [];
    if (options.endYear) {
        period = (0, generateYears_1.default)(Number(firstYear), Number(options.endYear));
    }
    else {
        period = [Number(firstYear)];
    }
    yield excelService_1.default.saveCardsBySets(sets, period);
    yield mongoService_1.default.close();
    process.exit(0);
});
exports.default = createMTGExcels;
//# sourceMappingURL=createMTGExcel.js.map