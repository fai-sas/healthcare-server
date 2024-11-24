"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtiesRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const specialties_controller_1 = require("./specialties.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const imageUploader_1 = require("../../utils/imageUploader");
const specialties_validation_1 = require("./specialties.validation");
const router = express_1.default.Router();
router.get('/', specialties_controller_1.SpecialtiesController.getAllSpecialties);
router.post('/', imageUploader_1.imageUploader.upload.single('file'), (req, res, next) => {
    req.body = specialties_validation_1.SpecialtiesValidation.create.parse(JSON.parse(req.body.data));
    return specialties_controller_1.SpecialtiesController.createSpecialties(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), specialties_controller_1.SpecialtiesController.deleteSpecialties);
exports.SpecialtiesRoutes = router;
