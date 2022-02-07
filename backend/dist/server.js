"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const realEstate_routes_1 = __importDefault(require("./routes/realEstate.routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
//static server
app.use(express_1.default.static('public'));
//
//connect to DB
mongoose_1.default.connect('mongodb://localhost:27017/pia-real-estate');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("Connected to the MongoDB");
});
// router
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/realEstates', realEstate_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map