import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import useAuth from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [, setPersist] = useLocalStorage("auth", false);

  const axiosInstance = useAxios();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMsg("");

    if (!username || !password) {
      setErrMsg("Please fill in all fields.");
      return;
    }

    try {
      const response = await axiosInstance({
        endpoint: "/api/auth/login",
        method: "POST",
        data: JSON.stringify({ username, password }),
      });

      setAuth({
        username: username,
        accessToken: response.data.token,
      });

      setPersist(true);

      setPassword("");

      navigate(from, { replace: true });
    } catch (error) {
      if (error.response.data?.message) {
        setErrMsg(error.response.data.message);
      } else {
        setErrMsg("Something went wrong. Please try again.");
      }

      errRef.current.focus();
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <img src="/images/bgcode.png" alt="" className="mb-8" />
      <section className="w-90 min-h-96 border border-gray-300 p-3 bg-gray-100 rounded-md">
        <p
          ref={errRef}
          className={`bg-red-600 text-white text-sm p-2 my-2 rounded-md ${
            errMsg ? "block" : "hidden"
          }`}
          aria-live="assertive"
        >
          <WarningAmberIcon className="text-white mr-2" fontSize="small" />
          {errMsg}
        </p>
        <h1 className="text-2xl mb-4 font-bold">Login</h1>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            ref={userRef}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md bg-white"
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md bg-white"
            required
          />

          <button className="bg-blue-500 text-white p-2 rounded-md my-2">
            Login
          </button>

          <p className="mt-6">
            <span className="mr-2">Don&apos;t have an account?</span>
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
