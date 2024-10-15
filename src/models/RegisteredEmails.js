import { Schema, model, models } from 'mongoose'

const registeredEmailSchema = new Schema({    
    email: String,    
}, {
    versionKey: false,
    timestamps: true
})

export default models.RegisteredEmail || model('RegisteredEmail', registeredEmailSchema)