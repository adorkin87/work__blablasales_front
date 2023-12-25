import { apiUploadAudio } from '../api/uploadAudio.api.ts';
import mwRequestToApi from '../../../../../shared/middleware/requestToApi.mv.ts';

export async function uploadAudio(formData: FormData) {
    const accessToken: string | false = localStorage.getItem(import.meta.env.VITE_LS_ACCESS_TOKEN) || false;

    if (accessToken) {
        const fetchResult = await mwRequestToApi(() =>
            apiUploadAudio('http://10.10.0.106:8002/api/v1/audio', accessToken, formData)
        );

        console.log(fetchResult);
    }
}
