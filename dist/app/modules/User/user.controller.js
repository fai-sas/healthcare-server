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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const user_constant_1 = require("./user.constant");
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createAdminIntoDb(req);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Admin Created Successfully!',
        data: result,
    });
}));
const createDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createDoctorIntoDb(req);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Doctor Created Successfully!',
        data: result,
    });
}));
const createPatient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createPatientIntoDb(req);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Patient Created Successfully!',
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query)
    const filters = (0, pick_1.default)(req.query, user_constant_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield user_service_1.userService.getAllUsersFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Users data fetched!',
        meta: result.meta,
        data: result.data,
    });
}));
const changeProfileStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userService.changeProfileStatusIntoDb(id, req.body);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Users profile status changed!',
        data: result,
    });
}));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.userService.getMyProfileFromDb(user);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'My profile data fetched!',
        data: result,
    });
}));
const updateMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.userService.updateMyProfileIntoDb(user, req);
    (0, sendResponse_1.default)(res, {
        status: httpStatus.OK,
        success: true,
        message: 'My profile updated!',
        data: result,
    });
}));
exports.userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUsers,
    getMyProfile,
    updateMyProfile,
    changeProfileStatus,
};
