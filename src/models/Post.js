import { Schema, model, models } from 'mongoose'

const postSchema = new Schema({    
    title: String,    
    description: String,
    ai_response: String,
    category: String,
    author: String,    
    image: [String],
}, {
    versionKey: false,
    timestamps: true
})

export default models.Post || model('Post', postSchema)