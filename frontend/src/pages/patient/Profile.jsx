import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Phone, Calendar, Users } from "lucide-react";
import toast from "react-hot-toast";
import PatientLayout from "../../layouts/PatientLayout";
import {
  getMyProfile,
  updateMyProfile,
} from "../../api/patient";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    gender: "",
    date_of_birth: "",
  });

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        if (res.data) {
          setUserName(res.data.name || "");
          
          let formattedDate = "";
          if (res.data.date_of_birth) {
            const date = new Date(res.data.date_of_birth);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0];
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
        toast.error("Failed to load profile");
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    setLoading(true);
    try {
      const formattedForm = {
        ...form,
        date_of_birth: form.date_of_birth || null,
      };
      
      await updateMyProfile({
        full_name: userName,
        ...formattedForm,
      });
      
      toast.success("Profile updated successfully!", {
        icon: "✅",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PatientLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-500">Manage your personal information</p>
        </motion.div>

        {/* Profile Form - Full Width Container */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full"
        >
          {/* Grid Layout for Better Use of Space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field - Full Width */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-primary" />
                Name
              </label>
              <div className="relative">
                <input
                  name="full_name"
                  value={userName}
                  disabled
                  placeholder="Full Name"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 cursor-not-allowed focus:outline-none focus:border-primary/30 transition-colors"
                  title="Name cannot be changed (set during account creation)"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                  Read-only
                </span>
              </div>
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone || ""}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </motion.div>

            {/* Date of Birth Field */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-primary" />
                Date of Birth
              </label>
              <input
                name="date_of_birth"
                type="date"
                value={form.date_of_birth || ""}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                max={new Date().toISOString().split('T')[0]}
              />
            </motion.div>

            {/* Gender Field - Full Width */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                <Users className="w-4 h-4 text-primary" />
                Gender
              </label>
              <select
                name="gender"
                value={form.gender || ""}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>

            {/* Save Button - Full Width */}
            <motion.div variants={itemVariants} className="md:col-span-2 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveProfile}
                disabled={loading}
                className={`
                  w-full bg-gradient-to-r from-blue-300 to-blue-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/30
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:shadow-primary/40"}
                `}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </PatientLayout>
  );
}
