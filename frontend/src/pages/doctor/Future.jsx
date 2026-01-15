import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { doctorApi } from "../../api/doctor";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export default function Future() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorApi
      .upcoming()
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Error loading appointments:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DoctorLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Upcoming Appointments
          </h1>
          <p className="text-gray-500">View your future scheduled appointments</p>
        </motion.div>

        {/* Appointments List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center"
          >
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No upcoming appointments</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((a, index) => (
              <motion.div
                key={a.id}
                variants={itemVariants}
                custom={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{a.patient_name}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(a.appointment_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {a.start_time} - {a.end_time}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <ArrowRight className="w-4 h-4" />
                  <span>Upcoming</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </DoctorLayout>
  );
}
