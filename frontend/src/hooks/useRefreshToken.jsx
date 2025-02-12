import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    try {
      const response = await axios.get("api/auth/refreshToken", {
        withCredentials: true,
      });

      const newToken = response.data.token;
      setAuth((prev) => ({ ...prev, accessToken: newToken }));

      return newToken;
    } catch {
      return null;
    }
  };

  return refreshToken;
};

export default useRefreshToken;
