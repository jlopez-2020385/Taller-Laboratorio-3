"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import companiesRouter from "../src/companies/companies.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";


const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("/empresaCOPEREX/v1/auth", authRoutes);
    app.use("/empresaCOPEREX/v1/user", userRoutes);
    app.use("/empresaCOPEREX/v1/comapnies", companiesRouter);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT || 3001; // Asegúrate de que el puerto sea 3001
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};