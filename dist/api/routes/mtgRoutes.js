"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mtgController_1 = __importDefault(require("../controllers/mtgController"));
const homeController_1 = __importDefault(require("../controllers/homeController"));
const router = express_1.default.Router();
router.get('/mtg/:firstDate/:lastDate?', mtgController_1.default.getExcelMTGCards);
router.get('/', homeController_1.default.home);
exports.default = router;
//# sourceMappingURL=mtgRoutes.js.map