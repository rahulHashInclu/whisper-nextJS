import { getSession } from "next-auth/react";

class ApiClient {
  static async #getAuthHeader() {
    const session = await getSession();
    return session?.accessToken
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {};
  }

  static async fetch(endpoint, options = {}) {
    try {
      const {
        method = "GET",
        body,
        headers = {},
        isFormData = false,
      } = options;

      const url = endpoint; // import endpoints from helper/constants.js
      const authHeaders = await this.#getAuthHeader();

      const defaultHeaders = isFormData
        ? { ...authHeaders }
        : {
            "Content-type": "application/json",
            ...authHeaders,
          };

      const finalHeaders = {
        ...defaultHeaders,
        ...headers,
      };

      const requestOptions = {
        method,
        headers: finalHeaders,
        ...(body && {
          body: isFormData ? body : JSON.stringify(body),
        }),
      };

      const response = await fetch(url, requestOptions);

      // Handle different response types
      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        return { ok: response.ok, status: response.status, data };
      }

      // Handle non-JSON responses (like files)
      const data = await response.blob();
      return { ok: response.ok, status: response.status, data };
    } catch (err) {
      console.error("API request failed", err);
      throw err;
    }
  }

  // different requests for method types
  static async get(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: "GET" });
  }

  static async post(endpoint, data, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: "POST",
      body: data,
    });
  }

  static async put(endpoint, data, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: "PUT",
      body: data,
    });
  }

  static async delete(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: "DELETE" });
  }
}

export default ApiClient;