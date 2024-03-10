"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mtgRoutes_1 = __importDefault(require("./api/routes/mtgRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', mtgRoutes_1.default);
app.use('/api/mtg', mtgRoutes_1.default);
// Route qui déclenche une erreur
app.get('/erreur', (req, res, next) => {
    const err = new Error('Erreur délibérée!');
    next(err);
});
app.use((err, req, res, next) => {
    console.error(`Erreur capturée: ${err.message}`);
    res.status(500).send('Quelque chose a mal tourné!');
});
exports.default = app;
//# sourceMappingURL=app.js.map