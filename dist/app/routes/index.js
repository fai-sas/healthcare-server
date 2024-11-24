"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const doctor_routes_1 = require("../modules/Doctor/doctor.routes");
const specialties_routes_1 = require("../modules/Specialties/specialties.routes");
const patient_route_1 = require("../modules/Patient/patient.route");
const schedule_routes_1 = require("../modules/Schedule/schedule.routes");
const doctorSchedule_routes_1 = require("../modules/DoctorSchedule/doctorSchedule.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/user',
        route: user_route_1.userRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/doctor',
        route: doctor_routes_1.DoctorRoutes,
    },
    {
        path: '/patient',
        route: patient_route_1.PatientRoutes,
    },
    {
        path: '/specialties',
        route: specialties_routes_1.SpecialtiesRoutes,
    },
    {
        path: '/schedule',
        route: schedule_routes_1.ScheduleRoutes,
    },
    {
        path: '/doctor-schedule',
        route: doctorSchedule_routes_1.DoctorScheduleRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
