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
const excelService_1 = __importDefault(require("../services/excelService"));
const mongoService_1 = __importDefault(require("../services/mongoService"));
const mtgService_1 = __importDefault(require("../services/mtgService"));
const generateYears_1 = __importDefault(require("../../utils/generateYears"));
const setPeriod_1 = __importDefault(require("../../utils/setPeriod"));
const mtgController = {
    getExcelMTGCards: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        mongoService_1.default.connect(process.env.URL_API_LOCAL);
        const { firstDate, lastDate } = req.params;
        const sets = yield mtgService_1.default.getAllSets();
        const setFiltered = lastDate ? (0, setPeriod_1.default)(sets, Number(firstDate), Number(lastDate)) : (0, setPeriod_1.default)(sets, Number(firstDate), Number(firstDate));
        let period = [];
        if (lastDate) {
            period = (0, generateYears_1.default)(Number(firstDate), Number(lastDate));
        }
        else {
            period = [firstDate];
        }
        excelService_1.default.saveCardsBySets(sets, period);
        res.send(setFiltered);
    }),
};
exports.default = mtgController;
//# sourceMappingURL=mtgController.js.map