import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            precipitationData: null,
            setPrecipitationData: (data) => set({ precipitationData: data }),
            VCIData: null,
            setVCIData: (data) => set({ VCIData: data }),
            EVIData: null,
            setEVIData: (data) => set({ EVIData: data }),
            MSIData: null,
            setMSIData: (data) => set({ MSIData: data }),
            locationInput: '',
            setLocationInput: (data) => set({ locationInput: data }),
            addressInput: '',
            setAddressInput: (data) => set({ addressInput: data }),
            optionsSelected: [],
            setOptionsSelected: (data) => set({ optionsSelected: data }),
            clearStore: () => set({
                precipitationData: null,
                VCIData: null,
                EVIData: null,
                MSIData: null,
                locationInput: '',
                addressInput: '',
                optionsSelected: []
            })
        }),
        {
            name: 'WEBGIS-DISTAN-STORAGE',
        }
    )
);
