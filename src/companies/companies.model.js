import { Schema, model} from "mongoose";

const companiesSchema = Schema({
    name: { 
        type: String,
        required: [true, "Name is required"],
        maxLength: [100, "Name cannot exceed 100 characters"]
    },

    corporateReason: { 
        type: String, 
        required: [true, "Name is required"],
        maxLength: [100, "Name cannot exceed 100 characters"]
    },

    nit: { 
        type: String, 
        unique: true, 
        required: true 
    },

    category: { 
        type: String, 
        enum: ["Pequeña","Mediana", "Grande"], 
        required: true 
    },

    foundationDate: { 
        type: Date, 
        required: true 
    }, 

    yearsCareer: { 
        type: Number 
    }, 

    country: { 
        type: String, 
        required: true 
    },

    city: { 
        type: String, 
        required: true 
    },

    phone: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true 
    },

    sitioWeb: { 
        type: String 
    },
    status:{
        type: Boolean,
        default: true
    }

},
{
    versionKey: false,
    timeStamps: true
})
export default model("Companies", companiesSchema)