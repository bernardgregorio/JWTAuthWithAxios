import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import useLocalStorage from "../../hooks/useLocalStorage";

const RequireAuth = () => {
  const { auth } = useAuth();
  const [persist] = useLocalStorage("auth", false);
  const refreshToken = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const refreshTokenAsync = async () => {
      try {
        await refreshToken();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!auth?.accessToken && persist) {
      refreshTokenAsync();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !persist ? (
    <Navigate to="/login" />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
