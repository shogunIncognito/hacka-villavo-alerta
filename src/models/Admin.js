import { Schema, model, models } from 'mongoose'

const adminSchema = new Schema({    
    username: String,
    password: {
        type: String,
        select: false
    },
    email: String,  
    superAdmin: {
        type: Boolean,
        default: false
    },  
}, {
    versionKey: false,
    timestamps: true
})

export default models.Admin || model('Admin', adminSchema)