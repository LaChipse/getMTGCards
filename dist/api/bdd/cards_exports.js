"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cardsExportsSchema = new mongoose_1.default.Schema({
    id: String,
    setName: String,
    code: String,
    cardCount: Number,
    releaseDate: String,
    type: String,
    updateDate: String,
});
const cardsExports = mongoose_1.default.model('cards_exports', cardsExportsSchema);
exports.default = cardsExports;
//# sourceMappingURL=cards_exports.js.map