import { AxiosInstance } from "@/Services/AxiosConfig";

class ApiService {
    async get(url, params = {}) {
        try {
            const response = await AxiosInstance({
                method: "GET",
                url: url,
                params: params,
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    async post(url, body) {
        try {
            const response = await AxiosInstance({
                method: "POST",
                url: url,
                data: body,
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export default ApiService;
