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
exports.AddUsersController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class AddUsersController {
    constructor(addUsersUseCase) {
        this.addUsersUseCase = addUsersUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, last_name, email, password, phone, status } = req.body;
                const saltRounds = 10;
                password = yield bcrypt_1.default.hash(password, saltRounds);
                let createdUsers = yield this.addUsersUseCase.run(name, last_name, email, password, phone, status);
                if (createdUsers) {
                    return res.status(201).send({
                        status: false,
                        data: {
                            name: createdUsers.name,
                            last_name: createdUsers.last_name,
                            password: createdUsers.password,
                            email: createdUsers.email,
                            phone: createdUsers.phone,
                        },
                        message: "Usuario ha sido creado exitosamente"
                    });
                }
                res.status(400).send({
                    data: [],
                    validations: [],
                    message: "Error al crear Usuario nuevo, intentalo mas tarde"
                });
            }
            catch (error) {
                console.error("Error in AddUsersController:", error);
                res.status(500).send({
                    message: "Error interno del servidor"
                });
            }
        });
    }
}
exports.AddUsersController = AddUsersController;
