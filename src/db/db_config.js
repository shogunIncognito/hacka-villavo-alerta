import mongoose from 'mongoose'

export const dbConnect = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI)

        if (connection.readyState === 1) {
            console.log('Database connected')
            return await Promise.resolve(true)
        }
    } catch (error) {
        console.log(error)
        return await Promise.reject(error)
    }
}