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
            locationInputFromMetadata: null,
            setLocationInputFromMetadata: (data) => set({ locationInputFromMetadata: data }),
            areaJsonInput: '',
            setAreaJsonInput: (data) => set({ areaJsonInput: data }),
            wideLandInput: '',
            setWideLandInput: (data) => set({ wideLandInput: data }),
            addressInput: '',
            setAddressInput: (data) => set({ addressInput: data }),
            optionsSelected: null,
            setOptionsSelected: (data) => set({ optionsSelected: data }),
            localSetting: {
                isGeolocation: true,
                isDisplayDataSpatials: true,
            },
            setLocalSetting: (newSettings) => set((state) => ({
                localSetting: {
                    ...state.localSetting,
                    ...newSettings,
                },
            })),
            clearStore: () => set({
                precipitationData: null,
                VCIData: null,
                EVIData: null,
                MSIData: null,
                locationInput: '',
                locationInputFromMetadata: null,
                areaJsonInput: '',
                wideLandInput: '',
                addressInput: '',
                optionsSelected: null,
            })
        }),
        {
            name: 'WEBGIS-DISTAN-STORAGE',
        }
    )
);
