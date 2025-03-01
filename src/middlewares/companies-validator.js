import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { nitExists,companiesExists} from "../helpers/db-validators.js"
import { validateJWT } from "../middlewares/validate-jwt.js"  
import { hasRoles } from "../middlewares/validate-roles.js"

export const comapiensValidator = [
    validateJWT, 
    hasRoles("ADMIN_ROLE"), 
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("corporateReason").notEmpty().withMessage("La razón social es requerida"),
    body("nit").notEmpty().withMessage("el nit es requerido"),
    body("category").notEmpty().withMessage("la categoria es requerida"),
    body("foundationDate").notEmpty().withMessage("la fecha de fundacion es requerida"),
    body("country").notEmpty().withMessage("el pais es requerido"),
    body("city").notEmpty().withMessage("la ciudad es requerida"),
    body("phone").notEmpty().withMessage("el telefono es requerido"),
    body("email").notEmpty().withMessage("el email es requerido"),
    body("nit").custom(nitExists),
    validarCampos,
    deleteFileOnError,
    handleErrors,
];

export const updateComapniesValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id", "No es un ID valido").isMongoId(),
    param("id").custom(companiesExists),
    validarCampos,
    handleErrors
]

