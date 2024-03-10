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
const deleteAfter = (date) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoService_1.default.connect();
    const deleted = yield mongoService_1.default.deleteAfter(date);
    console.log(`${deleted.deletedCount} éléments supprimés`);
    yield mongoService_1.default.close();
    process.exit(0);
});
exports.default = deleteAfter;
//# sourceMappingURL=deletAfter.js.map