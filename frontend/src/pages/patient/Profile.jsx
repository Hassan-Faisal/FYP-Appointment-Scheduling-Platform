import { useEffect, useState } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import {
  getMyProfile,
  updateMyProfile,
} from "../../api/patient";

export default function Profile() {
  const [userName, setUserName] = useState(""); // User's name from account (read-only)
  const [form, setForm] = useState({
    phone: "",
    gender: "",
    date_of_birth: "",
  });

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        if (res.data) {
          setUserName(res.data.name || ""); // Store user's name from account
          
          // Format date_of_birth for date input (YYYY-MM-DD format)
          let formattedDate = "";
          if (res.data.date_of_birth) {
            // If date comes as string, parse and format it
            const date = new Date(res.data.date_of_birth);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
            }
          }
          
          setForm({
            phone: res.data.phone || "",
            gender: res.data.gender || "",
            date_of_birth: formattedDate,
          });
        }
      })
      .catch((err) => {
        console.error("Error loading profile:", err);
        // Profile doesn't exist yet, form will remain empty
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      // Format date_of_birth to YYYY-MM-DD format for backend
      const formattedForm = {
        ...form,
        date_of_birth: form.date_of_birth || null, // Send null if empty
      };
      
      // Include full_name with user's account name (read-only)
      await updateMyProfile({
        full_name: userName, // Always use user's account name
        ...formattedForm,
      });
      alert("Profile updated");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please check the date format.");
    }
  };

  return (
    <PatientLayout>
      <h1 className="text-xl font-bold mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        {/* Full Name field - shows user's name from account, read-only */}
        
        <label className="block mb-1 text-sm text-gray-600">Name</label>
        <input
          name="full_name"
          value={userName}
          disabled
          placeholder="Full Name"
          className="w-full border p-2 mb-3 bg-gray-100 cursor-not-allowed"
          title="Name cannot be changed (set during account creation)"
        />
        
        <label className="block mb-1 text-sm text-gray-600">Phone Number</label>
        {/* Phone field */}
        <input
          name="phone"
          type="tel"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 mb-3"
        />
        
        {/* Date of Birth field - with calendar picker */}
        <label className="block mb-1 text-sm text-gray-600">Date of Birth</label>
        <input
          name="date_of_birth"
          type="date"
          value={form.date_of_birth || ""}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          max={new Date().toISOString().split('T')[0]} // Prevent future dates
        />
<label className="block mb-1 text-sm text-gray-600">Gender</label>
        <select
          name="gender"
          value={form.gender || ""}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <button
          onClick={saveProfile}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </PatientLayout>
  );
}
