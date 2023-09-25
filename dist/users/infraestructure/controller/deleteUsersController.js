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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const wasDeleted = yield this.deleteUserUseCase.run(Number(id));
                if (wasDeleted) {
                    return res.status(200).send({
                        status: "success",
                        message: "Usuario eliminado "
                    });
                }
                res.status(404).send({
                    status: "error",
                    message: "Usuario no encontrado"
                });
            }
            catch (error) {
                console.error("Error in DeleteUserController:", error);
                res.status(500).send({
                    status: "error",
                    message: "Error interno del servidor"
                });
            }
        });
    }
}
exports.DeleteUserController = DeleteUserController;
