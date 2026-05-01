import { getValue } from "../../utils/lodash";

export const get = (url, payload) => {
  try {
    const queryParams = new URLSearchParams(payload).toString();
    const requestUrl = `${url}?${queryParams}`;

    const requestOptions = {
      method: "GET",
    };

    return fetch(requestUrl, requestOptions)
      .then(handleResponse)
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const post = (url, payload) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const postWithoutBody = (url) => {
  const requestOptions = {
    method: "POST",
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const postWithMethod = (url) => {
  const requestOptions = {
    method: "POST",
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const postFileUpload = (url, payload) => {
  const requestOptions = {
    method: "POST",
    body: payload,
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const patchWithCode = (url, payload, code) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const postWithCode = (url, payload, code) => {
  const requestOptions = {
    method: "POST",
    body: payload,
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const postWithPayloadCode = (url, payload, code) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const patchFileUpload = (url, payload) => {
  const requestOptions = {
    method: "PATCH",
    body: payload,
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const patch = (url, payload) => {
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const put = (url, payload) => {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const Delete = (url) => {
  const requestOptions = {
    method: "DELETE",
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const DeleteWithPayload = (url, payload) => {
  const requestOptions = {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const DeletePayload = (url, payload) => {
  const requestOptions = {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const getWithToken = (url, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const getPayload = (url, payload) => {
  const requestOptions = {
    method: "GET",
    body: JSON.stringify(payload),
  };

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
