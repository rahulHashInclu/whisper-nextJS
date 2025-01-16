const BASE_PATH = '/whisper';
const BASE_URL = 'https://whisper.hashinclu.de:5000';
const SIGN_UP = `${BASE_URL}/signup`;
const SIGN_IN = `${BASE_URL}/login`;
const GET_RECORDINGS = `${BASE_URL}/get-recordings`;
const UPLOAD_AUDIO = `${BASE_URL}/upload-audio`;
const DOWNLOAD_AUDIO = `${BASE_URL}/download-audio`;
const GET_TRANSCRIPTIONS = `${BASE_URL}/view-json`;

export {
    SIGN_UP,
    SIGN_IN,
    GET_RECORDINGS,
    UPLOAD_AUDIO,
    BASE_PATH,
    DOWNLOAD_AUDIO,
    GET_TRANSCRIPTIONS
}