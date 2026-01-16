import AdminLayout from "../../layouts/AdminLayout";
import { adminApi } from "../../api/admin";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Schedule() {
  const [form, setForm] = useState({ doctor_id: "", doctor_name: "", day: 0, start: "", end: "" });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminApi
      .doctors()
      .then((r) => {
        setDoctors(r.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading doctors:", err);
        setError("Failed to load doctors");
        setLoading(false);
      });
  }, []);

  const handleDoctorChange = (e) => {
    const selectedName = e.target.value;
    const selectedDoctor = doctors.find((d) => d.name === selectedName);
    setForm({
      ...form,
      doctor_name: selectedName,
      doctor_id: selectedDoctor ? selectedDoctor.id : "",
    });
  };

  const submit = async () => {
    if (!form.doctor_id) {
      alert("Please select a doctor");
      return;
    }
    if (!form.start || !form.end) {
      alert("Please select both start and end times");
      return;
    }

    try {
      const payload = {
        doctor_id: form.doctor_id,
        day_of_week: form.day,
        start_time: form.start,
        end_time: form.end,
      };
      await adminApi.addAvailability(payload);
      alert("Availability added successfully!");
      setForm({ doctor_id: "", doctor_name: "", day: 0, start: "", end: "" });
    } catch (error) {
      console.error("Error adding availability:", error);
      alert("Failed to add availability. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Doctor Schedule
          </h1>
          <p className="text-gray-500">Add availability schedule for doctors</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-md">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded mb-3"></div>
              <div className="h-10 bg-gray-200 rounded mb-3"></div>
              <div className="h-10 bg-gray-200 rounded mb-3"></div>
              <div className="h-10 bg-gray-200 rounded mb-3"></div>
            </div>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <select
                value={form.doctor_name}
                onChange={handleDoctorChange}
                className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.email}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Day (0-6, where 0=Sunday, 6=Saturday)"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: parseInt(e.target.value) || 0 })}
                min="0"
                max="6"
                className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <label className="block text-sm text-gray-600 mb-1">Start Time</label>
              <input
                type="time"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <label className="block text-sm text-gray-600 mb-1">End Time</label>
              <input
                type="time"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg w-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Availability
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
