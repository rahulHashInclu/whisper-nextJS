import ApiClient from "./apiClient";
import { GET_RECORDINGS, UPLOAD_AUDIO } from "@/helper/constants";


export const AudioService = {
    getRecordings: async () => {
        return ApiClient.get(GET_RECORDINGS);
    },

    uploadAudio: async (audioFile, noOfSpeakers) => {
        const formData = new FormData();
        formData.append('audio', audioFile);
        formData.append('num_speakers', noOfSpeakers);

        return ApiClient.post(UPLOAD_AUDIO, formData, {
            isFormData: true
        })
    }
}