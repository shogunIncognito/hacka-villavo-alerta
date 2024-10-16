import axios, { AxiosError } from "axios";

export const axiosGet = async ({ url }) => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        return AxiosError
    }
}