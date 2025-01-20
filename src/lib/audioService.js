import ApiClient from "./apiClient";
import { GET_RECORDINGS, UPLOAD_AUDIO, DOWNLOAD_AUDIO, GET_TRANSCRIPTIONS, GET_AI_RESPONSE, GENERATE_MEETING_MINUTES, VIEW_MEETING_MINUTES } from "@/helper/constants";


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
    },

    generateMeetingMinutes: async (recordingId) => {
        return ApiClient.get(`${GENERATE_MEETING_MINUTES}/${recordingId}`)
    },

    getMeetingMinutes: async (recordingId) => {
        return ApiClient.get(`${VIEW_MEETING_MINUTES}/${recordingId}`)
    }
}