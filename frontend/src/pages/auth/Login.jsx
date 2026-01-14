import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      // Store JWT
      localStorage.setItem("token", data.access_token);

      // Decode role (simple approach)
      const payload = JSON.parse(atob(data.access_token.split(".")[1]));
      const role = payload.role;

      if (role === "patient") navigate("/patient/dashboard");
      else if (role === "doctor") navigate("/doctor/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgSoft">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Clinic Login
        </h2>

        <input
          type="email"
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
        {/* <button
         onClick={() => resendVerification(email)}
         className="text-sm text-blue-600 hover:underline mt-2"
        >
           Resend verification email
        </button> */}


        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-primary">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
