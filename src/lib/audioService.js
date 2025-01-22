import ApiClient from "./apiClient";
import { GET_RECORDINGS, UPLOAD_AUDIO, DOWNLOAD_AUDIO, GET_TRANSCRIPTIONS, GET_AI_RESPONSE, GENERATE_MEETING_MINUTES, VIEW_MEETING_MINUTES, UPDATE_SPEAKER_NAME,
    RENAME_RECORDING
 } from "@/helper/constants";


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
    },

    updateSpeakerNames: async (jsonPath, speakerUpdates) => {
        const requestBody = {json_path: jsonPath, speaker_name_updates: speakerUpdates};

        return ApiClient.post(UPDATE_SPEAKER_NAME, requestBody)
    },

    renameRecording: async (recordingId, newRecordingName) => {
        const requestBody = {recording_id: recordingId, new_recording_name: newRecordingName};

        return ApiClient.post(RENAME_RECORDING, requestBody)
    }
}