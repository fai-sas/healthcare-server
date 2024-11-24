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
exports.DoctorController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const doctor_constants_1 = require("./doctor.constants");
const pick_1 = __importDefault(require("../../utils/pick"));
const doctor_service_1 = require("./doctor.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getAllDoctors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, doctor_constants_1.doctorFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield doctor_service_1.DoctorService.getAllDoctorsFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctors retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield doctor_service_1.DoctorService.getSingleDoctorFromDB(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctor retrieved successfully',
        data: result,
    });
}));
const updateDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield doctor_service_1.DoctorService.updateDoctorIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctor data updated!',
        data: result,
    });
}));
const deleteDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield doctor_service_1.DoctorService.deleteDoctorFromDB(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctor deleted successfully',
        data: result,
    });
}));
const softDelete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield doctor_service_1.DoctorService.doctorSoftDeleteFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctor soft deleted successfully',
        data: result,
    });
}));
exports.DoctorController = {
    updateDoctor,
    getAllDoctors,
    getSingleDoctor,
    deleteDoctor,
    softDelete,
};
