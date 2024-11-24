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
exports.PatientController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const patient_constants_1 = require("./patient.constants");
const patient_services_1 = require("./patient.services");
const getAllPatients = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, patient_constants_1.patientFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield patient_services_1.PatientService.getAllPatientsFromDb(filters, options);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Patient retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSinglePatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield patient_services_1.PatientService.getSinglePatientFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Patient retrieved successfully',
        data: result,
    });
}));
const updatePatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield patient_services_1.PatientService.updatePatientIntoDb(id, req.body);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Patient updated successfully',
        data: result,
    });
}));
const deletePatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield patient_services_1.PatientService.deletePatientFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Patient deleted successfully',
        data: result,
    });
}));
const softDeletePatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield patient_services_1.PatientService.softDeletePatientFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Patient soft deleted successfully',
        data: result,
    });
}));
exports.PatientController = {
    getAllPatients,
    getSinglePatient,
    updatePatient,
    deletePatient,
    softDeletePatient,
};
