import { Router } from "express";
import { crearCompanies , exportCompaniesToExcel,udateCompanies} from "./companies.controller.js";
import { comapiensValidator ,updateComapniesValidator} from "../middlewares/companies-validator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API for managing companies
 */

/**
 * @swagger
 * /companies/crearCompanies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the company"
 *               corporateReason:
 *                 type: string
 *                 description: "Corporate reason of the company"
 *               nit:
 *                 type: string
 *                 description: "NIT of the company"
 *               category:
 *                 type: string
 *                 enum: ["Pequeña", "Mediana", "Grande"]
 *                 description: "Category of the company"
 *               foundationDate:
 *                 type: string
 *                 format: date
 *                 description: "Foundation date of the company"
 *               yearsCareer:
 *                 type: number
 *                 description: "Years of career of the company"
 *               country:
 *                 type: string
 *                 description: "Country where the company is located"
 *               city:
 *                 type: string
 *                 description: "City where the company is located"
 *               phone:
 *                 type: string
 *                 description: "Phone number of the company"
 *               email:
 *                 type: string
 *                 description: "Email address of the company"
 *               sitioWeb:
 *                 type: string
 *                 description: "Website of the company"
 *               status:
 *                 type: boolean
 *                 description: "Status of the company"
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/crearCompanies", comapiensValidator, crearCompanies);

/**
 * @swagger
 * /companies/companiesexcel:
 *   post:
 *     summary: Export companies to Excel
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minYears:
 *                 type: number
 *               maxYears:
 *                 type: number
 *               category:
 *                 type: string
 *               sort:
 *                 type: string
 *                 enum: [ "asc", "desc" ]
 *     responses:
 *       200:
 *         description: Excel file generated successfully
 *       404:
 *         description: No companies found
 *       500:
 *         description: Server error
 */
router.post("/companiesexcel", exportCompaniesToExcel);

/**
 * @swagger
 * /companies/updateCompnies/{id}:
 *   put:
 *     summary: Update company information
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the company"
 *               corporateReason:
 *                 type: string
 *                 description: "Corporate reason of the company"
 *               nit:
 *                 type: string
 *                 description: "NIT of the company"
 *               category:
 *                 type: string
 *                 enum: ["Pequeña", "Mediana", "Grande"]
 *                 description: "Category of the company"
 *               foundationDate:
 *                 type: string
 *                 format: date
 *                 description: "Foundation date of the company"
 *               yearsCareer:
 *                 type: number
 *                 description: "Years of career of the company"
 *               country:
 *                 type: string
 *                 description: "Country where the company is located"
 *               city:
 *                 type: string
 *                 description: "City where the company is located"
 *               phone:
 *                 type: string
 *                 description: "Phone number of the company"
 *               email:
 *                 type: string
 *                 description: "Email address of the company"
 *               sitioWeb:
 *                 type: string
 *                 description: "Website of the company"
 *               status:
 *                 type: boolean
 *                 description: "Status of the company"
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/updateCompnies/:id", updateComapniesValidator, udateCompanies);

export default router;

