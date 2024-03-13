"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logsSchema = new mongoose_1.default.Schema({
    startDate: String,
    endDate: String,
    itemsAdd: Number,
    programName: String,
});
const logs = mongoose_1.default.model('logs', logsSchema);
exports.default = logs;
//# sourceMappingURL=logs.js.map