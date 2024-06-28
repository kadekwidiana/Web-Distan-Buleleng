import axios from "axios";

const createInstance = () => {
    const instance = axios.create();

    instance.interceptors.request.use(async (request) => {
        request.headers["Content-Type"] = 'application/json';
        return request;
    });

    return instance;
};

export const AxiosInstance = async (data) => {
    return createInstance()(data);
};