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
exports.ScheduleController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const schedule_sevice_1 = require("./schedule.sevice");
const pick_1 = __importDefault(require("../../utils/pick"));
const createSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schedule_sevice_1.ScheduleService.createScheduleIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Schedule created successfully!',
        data: result,
    });
}));
const getAllSchedules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['startDate', 'endDate']);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const user = req.user;
    const result = yield schedule_sevice_1.ScheduleService.getAllSchedulesFromDb(filters, options, user);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Schedule fetched successfully!',
        data: result,
    });
}));
const getSingleSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield schedule_sevice_1.ScheduleService.getSingleScheduleFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Schedule retrieval successfully',
        data: result,
    });
}));
const deleteSchedule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield schedule_sevice_1.ScheduleService.deleteScheduleFromDb(id);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Schedule deleted successfully',
        data: result,
    });
}));
exports.ScheduleController = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    deleteSchedule,
};
