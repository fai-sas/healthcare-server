"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const imageUploader_1 = require("../../utils/imageUploader");
const pagination_1 = require("../../utils/pagination");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const user_constant_1 = require("./user.constant");
const createAdminIntoDb = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield imageUploader_1.imageUploader.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const createdAdminData = yield transactionClient.admin.create({
            data: req.body.admin,
        });
        return createdAdminData;
    }));
    return result;
});
const createDoctorIntoDb = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield imageUploader_1.imageUploader.uploadToCloudinary(file);
        req.body.doctor.profilePhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: client_1.UserRole.DOCTOR,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const createdDoctorData = yield transactionClient.doctor.create({
            data: req.body.doctor,
        });
        return createdDoctorData;
    }));
    return result;
});
const createPatientIntoDb = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield imageUploader_1.imageUploader.uploadToCloudinary(file);
        req.body.patient.profilePhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 12);
    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
        role: client_1.UserRole.PATIENT,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const createdPatientData = yield transactionClient.patient.create({
            data: req.body.patient,
        });
        return createdPatientData;
    }));
    return result;
});
const getAllUsersFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = pagination_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    //console.log(filterData);
    if (params.searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        select: {
            id: true,
            email: true,
            role: true,
            needPasswordChange: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            admin: true,
            patient: true,
            doctor: true,
        },
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const changeProfileStatusIntoDb = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const updateUserStatus = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: status,
    });
    return updateUserStatus;
});
exports.userService = {
    createAdminIntoDb,
    createDoctorIntoDb,
    createPatientIntoDb,
    getAllUsersFromDB,
    changeProfileStatusIntoDb,
};
