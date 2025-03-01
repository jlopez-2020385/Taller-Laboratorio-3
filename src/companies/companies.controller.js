import ExcelJS from "exceljs";
import Companies from "./companies.model.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const crearCompanies = async (req, res) => {
    try {
        const data = req.body;

        const yearsCareer = new Date().getFullYear() - new Date(data.foundationDate).getFullYear();

        const newCompany = new Companies({ ...data, yearsCareer });

        await newCompany.save();

        res.status(200).json({
            success: true,
            message: "Company created successfully",
            company: newCompany
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al crear la empresa",
            error: err.message
        });
    }
};



export const exportCompaniesToExcel = async (req, res) => {
    try {
        let filter = {}; 
        const { minYears, maxYears, category, sort } = req.body;

        if (minYears && maxYears) {
            filter.yearsCareer = { $gte: parseInt(minYears), $lte: parseInt(maxYears) };
        }

        if (category) {
            filter.category = category;
        }

        let companies = await Companies.find(filter);

        if (companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay empresas que coincidan con los criterios"
            });
        }

        if (sort) {
            if (sort === "asc") {
                companies.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sort === "desc") {
                companies.sort((a, b) => b.name.localeCompare(a.name)); 
            }
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Empresas");

        worksheet.columns = [
            { header: "Nombre", key: "name", width: 20 },
            { header: "Razón Social", key: "corporateReason", width: 25 },
            { header: "NIT", key: "nit", width: 15 },
            { header: "Categoría", key: "category", width: 15 },
            { header: "Fecha de Fundación", key: "foundationDate", width: 20 },
            { header: "Años de Trayectoria", key: "yearsCareer", width: 20 },
            { header: "País", key: "country", width: 15 },
            { header: "Ciudad", key: "city", width: 20 },
            { header: "Teléfono", key: "phone", width: 15 },
            { header: "Email", key: "email", width: 30 },
            { header: "Sitio Web", key: "sitioWeb", width: 30 },
            { header: "Estatus", key: "status", width: 10 },
        ];

        companies.forEach((company) => {
            worksheet.addRow({
                name: company.name,
                corporateReason: company.corporateReason,
                nit: company.nit,
                category: company.category,
                foundationDate: company.foundationDate.toISOString().split("T")[0],
                yearsCareer: company.yearsCareer,
                country: company.country,
                city: company.city,
                phone: company.phone,
                email: company.email,
                sitioWeb: company.sitioWeb || "N/A",
                status: company.status ? "Activo" : "Inactivo",
            });
        });

        let fileName = "companies";
        if (category) fileName += `_Categoria-${category}`;
        if (minYears && maxYears) fileName += `_Trayectoria-${minYears}-${maxYears}`;
        if (sort) fileName += `_Orden-${sort}`;
        fileName += ".xlsx";

        const filePath = path.join(__dirname, '..', 'downloads', fileName);
        await workbook.xlsx.writeFile(filePath);

        res.status(200).json({
            success: true,
            message: "Archivos Excel generados correctamente",
            filePath: filePath
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al exportar empresas a Excel",
            error: err.message
        });
    }
};

export const udateCompanies = async (req,res)=> {
    try{
        const {id} = req.params;
        const data = req.body;

        const updatedCompany  = await Companies.findByIdAndUpdate(id , data ,{new: true});

        res.status(200).json({
            success: true,
            msg: "Empresa actualizada",
            companies:updatedCompany ,
        })
        
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar Empresa',
            error: err.message
        });
    }
};