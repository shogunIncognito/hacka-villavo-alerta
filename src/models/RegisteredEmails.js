import { Schema, model, models } from 'mongoose'

const registeredEmailSchema = new Schema({
    email: String,
    isActive: {
        type: Boolean,
        default: false
    },
    unsuscribeToken: String
}, {
    versionKey: false,
    timestamps: true
})

export default models.RegisteredEmail || model('RegisteredEmail', registeredEmailSchema)