// Common function to set headers
const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Accept: "application/json",
  Authorization: token ? `Bearer ${token}` : undefined,
});

const postRequest = async (apiUrl, token, data, isFormData = false) => {
  try {
    const headers = getHeaders(token);
    if (isFormData) headers['Content-Type'] = 'multipart/form-data';
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: data,
    });
    return response;
  } catch (err) {
    console.log(`Error posting data to ${apiUrl}`, error);
    throw error;
  }
};

export const signUpUser = (username, password) => {

}