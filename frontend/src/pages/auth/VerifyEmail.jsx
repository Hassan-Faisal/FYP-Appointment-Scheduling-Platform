import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {status === "verifying" && <p className="text-gray-600">Verifying email...</p>}
        {status === "success" && (
          <p className="text-green-600 font-semibold">
            ✅ Email verified! Redirecting to login...
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 font-semibold">
            ❌ Invalid or expired verification link
          </p>
        )}
      </div>
    </div>
  );
}
