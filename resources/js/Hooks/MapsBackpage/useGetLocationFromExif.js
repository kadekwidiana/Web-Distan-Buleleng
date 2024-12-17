import { Toast } from '@/Components/Alert/Toast';
import { useStore } from '@/Store/Index.store';
import EXIF from 'exifreader';
import { useShallow } from 'zustand/react/shallow';


export const useGetLocationFromExif = (photo, locationInputFromMetadata) => {
    const { setLocationInputFromMetadata } = useStore(
        useShallow((state) => (
            {
                setLocationInputFromMetadata: state.setLocationInputFromMetadata,
            }
        )),
    );

    const fileReader = new FileReader();

    if (photo && !locationInputFromMetadata) {
        fileReader.onload = () => {
            const exifData = EXIF.load(fileReader.result);
            // console.log('EXIF Data:', exifData);  // Debugging: Log EXIF data

            // Check if GPS data is available in EXIF
            if (exifData['GPSLatitude'] && exifData['GPSLongitude']) {
                const latitude = convertDMSToDecimal(exifData['GPSLatitude'].value, exifData['GPSLatitudeRef']?.value[0]);
                const longitude = convertDMSToDecimal(exifData['GPSLongitude'].value, exifData['GPSLongitudeRef']?.value[0]);
                // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                setLocationInputFromMetadata([latitude, longitude]);

                Toast.fire({
                    icon: "info",
                    title: "Koordinat GPS berhasil ditemukan dalam file yang Anda unggah!",
                });

                return { latitude, longitude };
            } else {
                // console.log("No GPS data found in EXIF.");
                setLocationInputFromMetadata([]); // ngebug re render toast (set [])

                Toast.fire({
                    icon: "error",
                    title: "Data GPS koordinat tidak ditemukan dalam file yang Anda unggah!"
                });
                return null;
            }
        };

        fileReader.readAsArrayBuffer(photo); // photo should be a file input
    }
};

// Helper function to convert DMS to decimal, handling fractional arrays [numerator, denominator]
const convertDMSToDecimal = (dmsArray, direction) => {
    if (!dmsArray || dmsArray.length < 3) {
        // console.log("Array DMS tidak valid atau data GPS tidak lengkap:", dmsArray);  // Debugging: Log invalid DMS data
        Toast.fire({
            icon: "error",
            title: "Data GPS tidak lengkap atau tidak valid dalam file yang Anda unggah!"
        });
        return NaN;
    }

    // Convert each DMS part from [numerator, denominator] to a decimal number
    const degrees = dmsArray[0][0] / dmsArray[0][1];
    const minutes = (dmsArray[1][0] / dmsArray[1][1]) / 60;
    const seconds = (dmsArray[2][0] / dmsArray[2][1]) / 3600;

    // Calculate the final decimal value
    let decimal = degrees + minutes + seconds;

    // Adjust sign based on direction (N/S/E/W)
    if (direction === 'S' || direction === 'W') {
        decimal = -decimal;
    }

    // Log for debugging precision
    // console.log(`DMS to Decimal Conversion: degrees=${degrees}, minutes=${minutes}, seconds=${seconds}, decimal=${decimal}`);

    return decimal;
};