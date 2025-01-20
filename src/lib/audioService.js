import ApiClient from "./apiClient";
import { GET_RECORDINGS, UPLOAD_AUDIO, DOWNLOAD_AUDIO, GET_TRANSCRIPTIONS, GET_AI_RESPONSE } from "@/helper/constants";


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
    },

    getRecordingAudio: async (id) => {
        return ApiClient.get(`${DOWNLOAD_AUDIO}/${id}`);
    },

    getTranscriptions: async (id) => {
        return ApiClient.get(`${GET_TRANSCRIPTIONS}/${id}`)
    },

    getAIResponse: async (query, recordingId) => {
        const requestBody = {query, recording_id:recordingId};

        return ApiClient.post(GET_AI_RESPONSE, requestBody)
    }
}