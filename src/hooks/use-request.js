import axios from "axios";
import { useState } from "react";

export default ({ method, url, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (body, id) => {
    try {
      url = id ? url + `/${id}` : url;

      setErrors(null);
      const response = await axios[method](url, body, {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      if (onSuccess) {
        console.log("response data", response.data);
        if (url.includes("signout")) onSuccess();
        else if (url.includes("user")) {
          onSuccess({
            username: response.data.currentUser.username,
            id: response.data.currentUser._id,
            role: response.data.currentUser.role,
          });
        } else onSuccess(response.data.posts);
      }

      return response.data;
    } catch (err) {
      if (url.includes("currentUser")) {
        setErrors(null);
      } else
        setErrors(
          <div>
            <ul>
              {err.response.data.errors.map((err) => (
                <li style={{ marginTop: "5px" }} key={err.message}>
                  {err.message}
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return { doRequest, errors };
};
