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
exports.DoctorScheduleController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const doctorSchedule_service_1 = require("./doctorSchedule.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const pick_1 = __importDefault(require("../../utils/pick"));
const doctorSchedule_constants_1 = require("./doctorSchedule.constants");
const createDoctorSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield doctorSchedule_service_1.DoctorScheduleService.createDoctorScheduleIntoDb(user, req.body);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctor Schedule created successfully!',
        data: result,
    });
}));
const getMySchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['startDate', 'endDate', 'isBooked']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const user = req.user;
    const result = yield doctorSchedule_service_1.DoctorScheduleService.getMyScheduleFromDb(filters, options, user);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'My Schedule fetched successfully!',
        data: result,
    });
}));
const deleteDoctorSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    const result = yield doctorSchedule_service_1.DoctorScheduleService.deleteDoctorScheduleFromDB(user, id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'My Schedule deleted successfully!',
        data: result,
    });
}));
const getAllDoctorSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, doctorSchedule_constants_1.scheduleFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield doctorSchedule_service_1.DoctorScheduleService.getAllDoctorScheduleFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctor Schedule retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
}));
exports.DoctorScheduleController = {
    createDoctorSchedule,
    getMySchedule,
    deleteDoctorSchedule,
    getAllDoctorSchedules,
};
