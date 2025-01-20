const BASE_PATH = '/whisper';
const BASE_URL = 'https://whisper.hashinclu.de:5000';
const SIGN_UP = `${BASE_URL}/signup`;
const SIGN_IN = `${BASE_URL}/login`;
const GET_RECORDINGS = `${BASE_URL}/get-recordings`;
const UPLOAD_AUDIO = `${BASE_URL}/upload-audio`;
const DOWNLOAD_AUDIO = `${BASE_URL}/download-audio`;
const GET_TRANSCRIPTIONS = `${BASE_URL}/view-json`;
const GET_AI_RESPONSE = `${BASE_URL}/query-search`;
const GENERATE_MEETING_MINUTES = `${BASE_URL}/generate-meeting-minutes`;
const VIEW_MEETING_MINUTES = `${BASE_URL}/view-meeting-minutes`;

export {
    SIGN_UP,
    SIGN_IN,
    GET_RECORDINGS,
    UPLOAD_AUDIO,
    BASE_PATH,
    DOWNLOAD_AUDIO,
    GET_TRANSCRIPTIONS,
    GET_AI_RESPONSE,
    GENERATE_MEETING_MINUTES,
    VIEW_MEETING_MINUTES
}