import ApiAnalisisService from '@/Services/AnalisisService'

import { useMutation } from "@tanstack/react-query";

export const usePrecipitationAnalisis = () => {
    return useMutation({
        mutationFn: (body) => ApiAnalisisService.precipitationAnalisis(body),
    });
};

export const useVCIAnalisis = () => {
    return useMutation({
        mutationFn: (body) => ApiAnalisisService.vciAnalisis(body),
    });
};

export const useEVIAndMSIAnalisis = () => {
    return useMutation({
        mutationFn: (body) => ApiAnalisisService.eviAndMsiAnalisis(body),
    });
};
