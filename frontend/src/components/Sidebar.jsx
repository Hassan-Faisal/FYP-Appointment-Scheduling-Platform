import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  CalendarCheck, 
  User,
  Stethoscope,
  Users,
  CalendarDays,
  Settings
} from "lucide-react";

const iconMap = {
  "Dashboard": LayoutDashboard,
  "Book Appointment": Calendar,
  "My Appointments": CalendarCheck,
  "Profile": User,
  "Doctors": Stethoscope,
  "Patients": Users,
  "Appointments": CalendarDays,
  "Schedule": Calendar,
  "Today": Calendar,
  "Future": CalendarDays,
  "History": CalendarCheck,
};

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Sidebar({ links }) {
  const location = useLocation();
  
  // Determine portal type based on current path
  const getPortalInfo = () => {
    if (location.pathname.startsWith("/admin")) {
      return { title: "Clinic", subtitle: "Admin Portal" };
    } else if (location.pathname.startsWith("/doctor")) {
      return { title: "Clinic", subtitle: "Doctor Portal" };
    } else {
      return { title: "Clinic", subtitle: "Patient Portal" };
    }
  };
  
  const portalInfo = getPortalInfo();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-64 bg-gradient-to-b from-white via-gray-50 to-white shadow-xl h-screen flex flex-col border-r border-gray-200"
    >
      {/* Logo/Brand Section */}
      <motion.div
        variants={linkVariants}
        className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-transparent"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-300 to-blue-600 p-3 rounded-xl shadow-lg"
          >
            <Stethoscope className="w-6 h-6 text-white" />
            {/* <img src="/logo.jpg" alt="logo" className="w-8 h-8" /> */}
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {portalInfo.title}
            </h2>
            <p className="text-xs text-gray-500">{portalInfo.subtitle}</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {links.map((link, index) => {
          const Icon = iconMap[link.label] || LayoutDashboard;
          const isActive = location.pathname === link.path;
          
          return (
            <motion.div
              key={link.path}
              variants={linkVariants}
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={link.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                  ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-primary"
                  }
                `}
              >
                {/* Active indicator background animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                </motion.div>
                
                <span className={`font-medium relative z-10 ${isActive ? "text-white" : ""}`}>
                  {link.label}
                </span>
                
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-white rounded-full relative z-10"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Section */}
      <motion.div
        variants={linkVariants}
        className="p-4 border-t border-gray-200 bg-gray-50/50"
      >
        <div className="text-xs text-gray-500 text-center">
          <p className="font-semibold text-gray-700">{portalInfo.subtitle}</p>
          <p className="mt-1">© 2024 Clinic System</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
