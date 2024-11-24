"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("./patient.controller");
const router = express_1.default.Router();
router.get('/', patient_controller_1.PatientController.getAllPatients);
router.get('/:id', patient_controller_1.PatientController.getSinglePatient);
router.patch('/:id', patient_controller_1.PatientController.updatePatient);
router.delete('/:id', patient_controller_1.PatientController.deletePatient);
router.delete('/soft/:id', patient_controller_1.PatientController.softDeletePatient);
exports.PatientRoutes = router;
