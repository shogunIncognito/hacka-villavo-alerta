import axios, { AxiosError } from "axios"

export const axiosPut = async ({ url, data }) => {
    try {
        const response = await axios.put(url, data)
        return response.data
    } catch (error) {
        return AxiosError
    }
}