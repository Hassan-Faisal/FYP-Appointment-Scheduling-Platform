import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../../layouts/AdminLayout";
import { adminApi } from "../../api/admin";
import CreateDoctorModal from "./CreateDoctor";
import EditDoctorModal from "./EditDoctor";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Doctors() {
  const [data, setData] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    adminApi.doctors()
      .then((r) => {
        console.log("Doctors data received:", r.data);
        setData(r.data || []);
      })
      .catch((err) => {
        console.error("Error loading doctors:", err);
        setError("Failed to load doctors. Please try again.");
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreateDoctor = (actionOrUpdater) => {
    if (actionOrUpdater === "submit") {
      // Handle submit action
      createDoctor("submit");
    } else {
      // Handle form state update (can be object or function)
      setForm(actionOrUpdater);
    }
  };

  const createDoctor = async (action) => {
    if (action === "submit") {
      // Validate required fields
      if (!form.full_name || !form.email || !form.password || !form.specialization) {
        alert("Please fill in all required fields (Name, Email, Password, Specialization)");
        return;
      }

      try {
        // Convert experience_years and consultation_fee to numbers if they exist
        const submitData = {
          ...form,
          experience_years: form.experience_years ? parseInt(form.experience_years) : null,
          consultation_fee: form.consultation_fee ? parseFloat(form.consultation_fee) : null,
        };

        console.log("Submitting doctor form:", submitData);
        const response = await adminApi.createDoctor(submitData);
        console.log("Doctor created successfully:", response.data);
        setShowCreate(false);
        setForm({});
        load();
      } catch (error) {
        console.error("Error creating doctor:", error);
        const errorMessage = error.response?.data?.detail || error.message || "Failed to create doctor";
        alert(`Failed to create doctor: ${errorMessage}`);
      }
    }
  };

  const updateDoctor = async (action) => {
    if (action === "submit") {
      // backend update endpoint can be added later
      setShowEdit(false);
      load();
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Doctors Management
            </h1>
            <p className="text-gray-500">Manage doctor accounts and profiles</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreate(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            + Create Doctor
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm border border-red-200 p-6"
          >
            <p className="text-red-600">{error}</p>
            <button
              onClick={load}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        No doctors found. Click "Create Doctor" to add one.
                      </td>
                    </tr>
                  ) : (
                    data.map((d, index) => (
                      <tr
                        key={d.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{d.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              d.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {d.is_active ? "Active" : "Blocked"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelected(d);
                                setShowEdit(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              Edit
                            </motion.button>

                            {d.is_active ? (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => adminApi.blockUser(d.id).then(load)}
                                className="text-red-600 hover:text-red-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                Block
                              </motion.button>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => adminApi.unblockUser(d.id).then(load)}
                                className="text-green-600 hover:text-green-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-green-50 transition-colors"
                              >
                                Unblock
                              </motion.button>
                          )}
                        </div>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <CreateDoctorModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateDoctor}
        />

        <EditDoctorModal
          open={showEdit}
          doctor={selected}
          onClose={() => setShowEdit(false)}
          onSave={setForm}
        />
      </motion.div>
    </AdminLayout>
  );
}
