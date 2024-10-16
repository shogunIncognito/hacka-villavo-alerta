import axios, { AxiosError } from "axios"

export const axiosPost = async ({ url, data }) => {
    try {
        const response = await axios.post(url, data)
        return response.data
    } catch (error) {
        return AxiosError
    }
}