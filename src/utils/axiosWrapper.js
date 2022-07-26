import axios from "axios";

const axiosWrapper = async (
  endpoint,
  body,
  method,
  type = "application/json"
) => {
  try {
    method = (method && method.toUpperCase()) || "GET";
    const storedData = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LS_USER_DATA)
    );
    let token = storedData?.token || false;

    let headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    if (type) {
      headers["Content-Type"] = type;
    }

    let response = false;

    try {
      response = await axios({
        url: `${import.meta.env.VITE_API_URL}${endpoint}`,
        method: method,
        data: method === "GET" ? undefined : JSON.stringify(body),
        headers,
      });

      return { ...response.data, status: response.status };
    } catch (err) {
      console.error(err);
      return err.response;
    }
  } catch (err) {
    console.log(error);
    console.error("HTTP request failed", err);
    return false;
  }
};

export default axiosWrapper;
