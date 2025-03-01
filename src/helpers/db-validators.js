import User from "../user/user.model.js"
import Companies from "../companies/companies.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const nitExists = async (nit = "") => {
    const existe = await Companies.findOne({ nit });
    if (existe) {
        throw new Error(`El NIT ${nit} ya está registrado`);
    }
};

export const companiesExists = async (id = "") => {
    const existe = await Companies.findById(id);
    console.log(existe);
    if (!existe) {
        throw new Error("No existe la empresa con el ID proporcionado");
    }
};