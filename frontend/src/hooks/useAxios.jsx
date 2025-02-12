import { useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import userRefreshToken from "./useRefreshToken";

export function useAxios() {
  const { auth } = useAuth();
  const refreshToken = userRefreshToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        /**
         * access token expired
         */
        if (
          error.response?.status === 403 &&
          error.response?.data &&
          error.response?.data?.message === "Access Token expired"
        ) {
          const newAccessToken = await refreshToken();

          if (!newAccessToken) {
            return Promise.reject(error);
          }

          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }

        /**
         * refresh token expired
         */
        if (
          error.response?.status === 400 &&
          error.response?.data?.message === "No token found"
        ) {
          localStorage.removeItem("auth");
          window.location.href = "/login"; // Redirect to login page
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [refreshToken]);

  const axiosInstance = async ({
    endpoint,
    method,
    data = null,
    signal = null,
  }) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (auth && auth?.accessToken) {
      headers["Authorization"] = `Bearer ${auth.accessToken}`;
    }

    return await axios({
      method,
      url: endpoint,
      headers,
      withCredentials: true,
      ...(data && { data }),
      ...(signal && { signal }),
    });
  };

  return axiosInstance;
}
