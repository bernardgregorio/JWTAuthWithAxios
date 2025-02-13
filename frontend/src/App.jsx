import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Dashboard from "./features/Dashboard";
import Missing from "./components/Missing";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
