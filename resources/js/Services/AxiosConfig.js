import axios from "axios";

const createInstance = () => {
    const instance = axios.create({
        timeout: 60000, // Set timeout menjadi 1 menit (60.000 milidetik)
    });

    instance.interceptors.request.use(async (request) => {
        request.headers["Content-Type"] = 'application/json';
        return request;
    });

    return instance;
};

export const AxiosInstance = async (data) => {
    return createInstance()(data);
};