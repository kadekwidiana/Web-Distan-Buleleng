import { AxiosInstance } from "./axios.config";
import { useMutation, useQuery } from "@tanstack/react-query";

// DATA LAYER
export const useGetDataLayers = () => {
    console.log('CALLLL')
    return useQuery({
        queryKey: ["data-layers"],
        queryFn: async () => {
            const response = await AxiosInstance({
                method: "GET",
                url: `/data-layer`,
            });

            return response.data;
        },
    });
}

export const usePrecipitationAnalisis = () => {
    return useMutation({
        mutationFn: async (body) => {
            try {
                const response = await AxiosInstance({
                    method: "POST",
                    url: `/precipitation`,
                    data: body,
                });

                return response.data;
            } catch (error) {
                throw new Error('Error', error);
            }

        },
    });
};

export const useVCIAnalisis = () => {
    return useMutation({
        mutationFn: async (body) => {
            try {
                const response = await AxiosInstance({
                    method: "POST",
                    url: `/vci`,
                    data: body,
                });

                return response.data;
            } catch (error) {
                throw new Error('Error', error);
            }

        },
    });
};


export const useEVIAndMSIAnalisis = () => {
    return useMutation({
        mutationFn: async (body) => {
            try {
                const response = await AxiosInstance({
                    method: "POST",
                    url: `/evi`,
                    data: body,
                });

                return response.data;
            } catch (error) {
                throw new Error('Error', error);
            }

        },
    });
};