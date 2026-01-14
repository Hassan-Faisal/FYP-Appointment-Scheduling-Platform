import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await forgotPassword(email);
      alert("Reset email sent");
    } catch {
      alert("Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgSoft">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Reset Password
        </h2>

        <input
          type="email"
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Send Reset Link
        </button>

        <p className="text-center mt-4 text-sm">
          <Link to="/" className="text-primary">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
