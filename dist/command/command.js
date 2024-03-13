#!/usr/bin/env node
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
const commander_1 = require("commander");
const createMTGExcel_1 = __importDefault(require("./createMTGExcel"));
const createLastMTGExcel_1 = __importDefault(require("./createLastMTGExcel"));
const deletAfter_1 = __importDefault(require("./deletAfter"));
const mongoService_1 = __importDefault(require("../services/mongoService"));
const program = new commander_1.Command();
program
    .name("MTG")
    .description("Outil CLI pour créer des fichiers Excel à partir des données MTG.")
    .version('1.0.0');
program
    .command('create')
    .description('Création excel mtg.')
    .argument('<firstYear>', 'année de début')
    .option('-eY, --endYear <endYear>', 'ajoute une année de fin')
    .action((firstYear, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoService_1.default.connect();
    yield (0, createMTGExcel_1.default)(firstYear, options);
    yield mongoService_1.default.close();
    process.exit(0);
}));
program
    .command('getLast')
    .description('Création excel dernier set mtg.')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoService_1.default.connect();
    yield (0, createLastMTGExcel_1.default)();
    yield mongoService_1.default.close();
    process.exit(0);
}));
program
    .command('deleteAfter')
    .description('Supprime données aprés date.')
    .argument('<date>', 'date')
    .action((date) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoService_1.default.connect();
    yield (0, deletAfter_1.default)(date);
    yield mongoService_1.default.close();
    process.exit(0);
}));
program.parse(process.argv);
//# sourceMappingURL=command.js.map