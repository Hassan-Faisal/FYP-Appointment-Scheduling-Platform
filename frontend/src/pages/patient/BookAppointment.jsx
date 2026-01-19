// import { useEffect, useState } from "react";
// import PatientLayout from "../../layouts/PatientLayout";
// import SlotButton from "../../components/SlotButton";
// import {
//   getDoctors,
//   getDoctorSlots,
//   bookAppointment,
// } from "../../api/booking";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [slots, setSlots] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");

//   useEffect(() => {
//     getDoctors().then((res) => setDoctors(res.data));
//   }, []);

//   const loadSlots = async (doctorId) => {
//     if (!selectedDate) return;
//     const res = await getDoctorSlots(doctorId, selectedDate);
//     setSlots((prev) => ({ ...prev, [doctorId]: res.data }));
//   };

//   const bookSlot = async (doctorId, slot) => {
//     await bookAppointment({
//       doctor_id: doctorId,
//       appointment_date: selectedDate,
//       start_time: slot.start_time,
//       end_time: slot.end_time,
//     });
//     alert("Appointment booked!");
//   };

//   return (
//     <PatientLayout>
//       <h1 className="text-xl font-bold mb-4">Book Appointment</h1>

//       <input
//         type="date"
//         className="border p-2 mb-6"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doc) => (
//           <div key={doc.id} className="bg-white p-4 rounded-xl shadow">
//             <h2 className="font-bold">{doc.full_name}</h2>
//             <p className="text-gray-500">{doc.specialization}</p>

//             <button
//               onClick={() => loadSlots(doc.id)}
//               className="text-sm text-blue-600 mt-2"
//             >
//               Load Slots
//             </button>

//             <div className="mt-4 flex flex-wrap gap-2">
//               {(slots[doc.id] || []).map((slot) => (
//                 <SlotButton
//                   key={slot.start_time}
//                   time={slot.start_time}
//                   available={slot.available}
//                   onClick={() => bookSlot(doc.id, slot)}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </PatientLayout>
//   );
// }


// import { useEffect, useState } from "react";
// import PatientLayout from "../../layouts/PatientLayout";
// import SlotButton from "../../components/SlotButton";
// import {
//   getDoctors,
//   getDoctorSlots,
//   bookAppointment,
// } from "../../api/booking";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [slots, setSlots] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");

//   // useEffect(() => {
//   //   getDoctors().then((res) => {
//   //     // ✅ FIX: ensure doctors is ALWAYS an array
//   //     const doctorList = Array.isArray(res.data)
//   //       ? res.data
//   //       : res.data?.data || [];

//   //     setDoctors(doctorList);
//   //   });
//   // }, []);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await getDoctors();
//         const doctorList = Array.isArray(res.data)
//           ? res.data
//           : res.data?.data || [];
  
//         setDoctors(doctorList);
//       } catch (err) {
//         console.error("Failed to load doctors", err);
//       }
//     };
    
//     console.log("Doctors:", doctors);
//     fetchDoctors();
//   }, []);
  

//   const loadSlots = async (doctorId) => {
//     if (!selectedDate) return;

//     const res = await getDoctorSlots(doctorId, selectedDate);

//     // ✅ also safely handle slot response
//     const slotList = Array.isArray(res.data)
//       ? res.data
//       : res.data?.data || [];

//     setSlots((prev) => ({ ...prev, [doctorId]: slotList }));
//   };



//   const bookSlot = async (doctorId, slot) => {
//     await bookAppointment({
//       doctor_id: doctorId,
//       appointment_date: selectedDate,
//       start_time: slot.start_time,
//       end_time: slot.end_time,
//     });
//     alert("Appointment booked!");
//   };

//   return (
//     <PatientLayout>
//       <h1 className="text-xl font-bold mb-4">Book Appointment</h1>

//       <input
//         type="date"
//         className="border p-2 mb-6"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doc) => (
//           <div key={doc.id} className="bg-white p-4 rounded-xl shadow">
//             <h2 className="font-bold">{doc.full_name}</h2>
//             <p className="text-gray-500">{doc.specialization}</p>

//             <button
//               onClick={() => loadSlots(doc.id)}
//               className="text-sm text-blue-600 mt-2"
//             >
//               Load Slots
//             </button>

//             <div className="mt-4 flex flex-wrap gap-2">
//               {(slots[doc.id] || []).map((slot) => (
//                 <SlotButton
//                   key={slot.start_time}
//                   time={slot.start_time}
//                   available={slot.available}
//                   onClick={() => bookSlot(doc.id, slot)}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </PatientLayout>
//   );
// }



// ///////////
// import { useEffect, useState } from "react";
// import PatientLayout from "../../layouts/PatientLayout";
// import SlotButton from "../../components/SlotButton";
// import {
//   getDoctors,
//   getDoctorSlots,
//   bookAppointment,
// } from "../../api/booking";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [slots, setSlots] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [loadingSlots, setLoadingSlots] = useState(false);

//   // 🔹 Load doctors once
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await getDoctors();
//         const doctorList = Array.isArray(res.data)
//           ? res.data
//           : res.data?.data || [];
//         setDoctors(doctorList);
//       } catch (err) {
//         console.error("Failed to load doctors", err);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // 🔹 Auto-load slots when date OR doctor changes
//   useEffect(() => {
//     if (selectedDoctorId && selectedDate) {
//       loadSlots(selectedDoctorId);
//     }
//   }, [selectedDate, selectedDoctorId]);

//   const loadSlots = async (doctorId) => {
//     if (!selectedDate) return;

//     setSelectedDoctorId(doctorId);
//     setLoadingSlots(true);

//     try {
//       const res = await getDoctorSlots(doctorId, selectedDate);
//       const slotList = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data || [];

//       setSlots((prev) => ({ ...prev, [doctorId]: slotList }));
//     } catch (err) {
//       console.error("Failed to load slots", err);
//     } finally {
//       setLoadingSlots(false);
//     }
//   };

//   const bookSlot = async (doctorId, slot) => {
//     if (!slot.available) return;

//     await bookAppointment({
//       doctor_id: doctorId,
//       appointment_date: selectedDate,
//       start_time: slot.start_time,
//       end_time: slot.end_time,
//     });

//     alert("Appointment booked!");
//     loadSlots(doctorId); // refresh slots
//   };

//   return (
//     <PatientLayout>
//       <h1 className="text-xl font-bold mb-4">Book Appointment</h1>

//       {/* 📅 Date Picker */}
//       <input
//         type="date"
//         className="border p-2 mb-6"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doc) => (
//           <div key={doc.id} className="bg-white p-4 rounded-xl shadow">
//             <h2 className="font-bold">{doc.full_name}</h2>
//             <p className="text-gray-500">{doc.specialization}</p>

//             <button
//               onClick={() => loadSlots(doc.id)}
//               className="text-sm text-blue-600 mt-2"
//             >
//               Load Slots
//             </button>

//             <div className="mt-4 flex flex-wrap gap-2">
//               {/* 🔄 Loading Spinner */}
//               {loadingSlots && selectedDoctorId === doc.id && (
//                 <p className="text-sm text-gray-500">Loading slots...</p>
//               )}

//               {/* 🚫 No slots */}
//               {!loadingSlots &&
//                 selectedDoctorId === doc.id &&
//                 (slots[doc.id] || []).length === 0 && (
//                   <p className="text-sm text-gray-400">No slots available</p>
//                 )}

//               {/* ✅ Slots */}
//               {(slots[doc.id] || []).map((slot) => (
//                 <SlotButton
//                   key={slot.start_time}
//                   time={slot.start_time}
//                   available={slot.available}
//                   disabled={!slot.available}
//                   onClick={() => bookSlot(doc.id, slot)}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </PatientLayout>
//   );
// }



// import { useEffect, useState } from "react";
// import PatientLayout from "../../layouts/PatientLayout";
// import SlotButton from "../../components/SlotButton";
// import {
//   getDoctors,
//   getDoctorSlots,
//   bookAppointment,
// } from "../../api/booking";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [slots, setSlots] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");
//   const [loadingDoctorId, setLoadingDoctorId] = useState(null);

//   // 🔹 Load doctors on page load
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await getDoctors();
//         const list = Array.isArray(res.data)
//           ? res.data
//           : res.data?.data || [];
//         setDoctors(list);
//       } catch (err) {
//         console.error("Failed to load doctors", err);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // 🔹 Auto-load slots when date changes
//   useEffect(() => {
//     if (!selectedDate) return;

//     doctors.forEach((doc) => {
//       loadSlots(doc.id);
//     });
//   }, [selectedDate]);

//   const loadSlots = async (doctorId) => {
//     if (!selectedDate) return;
//     const res = await getDoctorSlots(doctorId, selectedDate);
//     console.log("Doctor:", doctorId, "Date:", selectedDate);
//     console.log("Slots API response:", res.data);
    
//     setLoadingDoctorId(doctorId);

//     try {
//       const res = await getDoctorSlots(doctorId, selectedDate);
//       const slotList = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data || [];

//       setSlots((prev) => ({
//         ...prev,
//         [doctorId]: slotList,
//       }));
//     } catch (err) {
//       console.error("Failed to load slots", err);
//     } finally {
//       setLoadingDoctorId(null);
//     }
//   };


  

//   const bookSlot = async (doctorId, slot) => {
//     if (!slot.available) return;

//     try {
//       await bookAppointment({
//         doctor_id: doctorId,
//         appointment_date: selectedDate,
//         start_time: slot.start_time,
//         end_time: slot.end_time,
//       });

//       alert("Appointment booked successfully!");
//       loadSlots(doctorId); // refresh slots
//     } catch (err) {
//       console.error("Booking failed", err);
//       alert("Failed to book appointment");
//     }
//   };

//   return (
//     <PatientLayout>
//       <h1 className="text-xl font-bold mb-6">Book Appointment</h1>

//       {/* 📅 Date Picker */}
//       <input
//         type="date"
//         className="border p-2 mb-6 rounded"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doc) => (
//           <div key={doc.id} className="bg-white p-4 rounded-xl shadow">
//             <h2 className="font-bold text-lg">{doc.full_name}</h2>
//             <p className="text-gray-500">{doc.specialization}</p>

//             <div className="mt-4 flex flex-wrap">
//               {/* 🔄 Loading */}
//               {loadingDoctorId === doc.id && (
//                 <p className="text-sm text-gray-500">Loading slots...</p>
//               )}

//               {/* 🚫 No slots */}
//               {selectedDate &&
//                 loadingDoctorId !== doc.id &&
//                 (slots[doc.id] || []).length === 0 && (
//                   <p className="text-sm text-gray-400">
//                     No slots available
//                   </p>
//                 )}

//               {/* ✅ Slots */}
//               {(slots[doc.id] || []).map((slot) => (
//                 <SlotButton
//                   key={slot.start_time}
//                   time={`${slot.start_time} - ${slot.end_time}`}
//                   available={slot.available}
//                   onClick={() => bookSlot(doc.id, slot)}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </PatientLayout>
//   );
// }


// import { useEffect, useState } from "react";
// import PatientLayout from "../../layouts/PatientLayout";
// import SlotButton from "../../components/SlotButton";
// import {
//   getDoctors,
//   getDoctorSlots,
//   bookAppointment,
// } from "../../api/booking";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [slots, setSlots] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");
//   const [loadingDoctorId, setLoadingDoctorId] = useState(null);

//   // 🔹 Load doctors on page load
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await getDoctors();
//         const list = Array.isArray(res.data)
//           ? res.data
//           : res.data?.data || [];
//         setDoctors(list);
//       } catch (err) {
//         console.error("Failed to load doctors", err);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // 🔹 Auto-load slots when date changes
//   useEffect(() => {
//     if (!selectedDate) return;

//     doctors.forEach((doc) => {
//       loadSlots(doc.id);
//     });
//   }, [selectedDate, doctors]);

//   // 🔹 Load slots for ONE doctor
//   const loadSlots = async (doctorId) => {
//     if (!selectedDate) return;

//     try {
//       setLoadingDoctorId(doctorId);

//       console.log("Doctor:", doctorId, "Date:", selectedDate);

//       const res = await getDoctorSlots(doctorId, selectedDate);
//       const slotList = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data || [];

//       console.log("Slots API response:", slotList);

//       setSlots((prev) => ({
//         ...prev,
//         [doctorId]: slotList,
//       }));
//     } catch (err) {
//       console.error("Failed to load slots", err);
//       setSlots((prev) => ({
//         ...prev,
//         [doctorId]: [],
//       }));
//     } finally {
//       setLoadingDoctorId(null);
//     }
//   };

//   // 🔹 Book slot
//   const bookSlot = async (doctorId, slot) => {
//     if (!slot.available) return;

//     try {
//       await bookAppointment({
//         doctor_id: doctorId,
//         appointment_date: selectedDate,
//         start_time: slot.start_time,
//         end_time: slot.end_time,
//       });

//       alert("Appointment booked successfully!");
//       loadSlots(doctorId); // refresh slots
//     } catch (err) {
//       console.error("Booking failed", err);
//       alert("Slot already booked or error occurred");
//     }
//   };

//   return (
//     <PatientLayout>
//       <h1 className="text-xl font-bold mb-6">Book Appointment</h1>

//       {/* 📅 Date Picker */}
//       <input
//         type="date"
//         className="border p-2 mb-6 rounded"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="bg-white rounded-xl shadow p-6"
//           >
//             <h3 className="text-lg font-semibold">
//               {doctor.full_name}
//             </h3>
//             <p className="text-sm text-gray-500">
//               {doctor.specialization}
//             </p>

//             {/* SLOT SECTION */}
//             <div className="mt-4">
//               {/* 🔄 Loading */}
//               {loadingDoctorId === doctor.id && (
//                 <p className="text-sm text-gray-500">
//                   Loading slots...
//                 </p>
//               )}

//               {/* 🚫 No slots */}
//               {selectedDate &&
//                 loadingDoctorId !== doctor.id &&
//                 (slots[doctor.id] || []).length === 0 && (
//                   <p className="text-sm text-gray-400">
//                     No slots available
//                   </p>
//                 )}

//               {/* ✅ Slots */}
//               {loadingDoctorId !== doctor.id &&
//                 (slots[doctor.id] || []).length > 0 && (
//                   <div className="flex flex-wrap gap-2">
//                     {slots[doctor.id].map((slot, index) => (
//                       <SlotButton
//                         key={index}
//                         time={`${slot.start_time} - ${slot.end_time}`}
//                         available={slot.available}
//                         onClick={() =>
//                           bookSlot(doctor.id, slot)
//                         }
//                       />
//                     ))}
//                   </div>
//                 )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </PatientLayout>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, Stethoscope, Loader2 } from "lucide-react";
// import toast from "react-hot-toast";

// import PatientLayout from "../../layouts/PatientLayout";
// import SlotButton from "../../components/SlotButton";
// import { getDoctors, getDoctorSlots, bookAppointment } from "../../api/booking";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const itemVariants = {
//   hidden: { y: 16, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.35 },
//   },
// };

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [slots, setSlots] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");
//   const [loadingDoctorId, setLoadingDoctorId] = useState(null);
//   const [bookingKey, setBookingKey] = useState(null); // `${doctorId}_${start}_${end}`

//   // Helpful min date (today) to prevent past selection
//   const minDate = useMemo(() => {
//     const d = new Date();
//     const yyyy = d.getFullYear();
//     const mm = String(d.getMonth() + 1).padStart(2, "0");
//     const dd = String(d.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
//   }, []);

//   // 🔹 Load doctors on page load
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await getDoctors();
//         const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
//         setDoctors(list);
//       } catch (err) {
//         console.error("Failed to load doctors", err);
//         toast.error("Failed to load doctors");
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // 🔹 Auto-load slots when date changes (for each doctor)
//   useEffect(() => {
//     if (!selectedDate) return;
//     if (!doctors?.length) return;

//     doctors.forEach((doc) => {
//       loadSlots(doc.id);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedDate, doctors]);

//   // 🔹 Load slots for ONE doctor
//   const loadSlots = async (doctorId) => {
//     if (!selectedDate) return;

//     try {
//       setLoadingDoctorId(doctorId);

//       const res = await getDoctorSlots(doctorId, selectedDate);
//       const slotList = Array.isArray(res.data) ? res.data : res.data?.data || [];

//       setSlots((prev) => ({
//         ...prev,
//         [doctorId]: slotList,
//       }));
//     } catch (err) {
//       console.error("Failed to load slots", err);
//       setSlots((prev) => ({
//         ...prev,
//         [doctorId]: [],
//       }));
//     } finally {
//       setLoadingDoctorId(null);
//     }
//   };

//   // 🔹 Book slot
//   const bookSlot = async (doctorId, slot) => {
//     if (!slot?.available) return;

//     const key = `${doctorId}_${slot.start_time}_${slot.end_time}`;
//     setBookingKey(key);

//     try {
//       await bookAppointment({
//         doctor_id: doctorId,
//         appointment_date: selectedDate,
//         start_time: slot.start_time,
//         end_time: slot.end_time,
//       });

//       toast.success("Appointment booked successfully!", { icon: "✅" });

//       // Refresh slots after booking so the button becomes grey/unavailable
//       await loadSlots(doctorId);
//     } catch (err) {
//       console.error("Booking failed", err);
//       toast.error("Slot already booked or error occurred", { icon: "❌" });
//     } finally {
//       setBookingKey(null);
//     }
//   };

//   return (
//     <PatientLayout>
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="w-full"
//       >
//         <div className="max-w-6xl mx-auto px-4 py-6">
//           {/* Header */}
//           <motion.div variants={itemVariants} className="mb-8">
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Book Appointment
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Pick a date, then choose an available slot for your preferred doctor.
//             </p>
//           </motion.div>

//           {/* Date Picker Card */}
//           <motion.div
//             variants={itemVariants}
//             className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 mb-8"
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
//                 <Calendar className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Select Appointment Date</p>
//                 <p className="text-base font-semibold text-gray-800">
//                   Choose a day to load all doctors’ slots
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//               <input
//                 type="date"
//                 min={minDate}
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="
//                   w-full sm:w-72
//                   px-4 py-3
//                   rounded-xl
//                   border border-gray-300
//                   shadow-sm
//                   focus:outline-none
//                   focus:ring-2 focus:ring-green-500
//                   focus:border-green-500
//                   cursor-pointer
//                   text-gray-800
//                 "
//               />

//               {!selectedDate && (
//                 <span className="text-sm text-gray-500">
//                   Please select a date to see available slots.
//                 </span>
//               )}
//             </div>
//           </motion.div>

//           {/* Doctors Grid */}
//           <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {doctors.map((doctor) => {
//               const docSlots = slots[doctor.id] || [];
//               const isLoadingThis = loadingDoctorId === doctor.id;

//               return (
//                 <motion.div
//                   key={doctor.id}
//                   variants={itemVariants}
//                   className="
//                     bg-white rounded-2xl shadow-md border border-gray-100 p-6
//                     hover:shadow-lg transition-shadow
//                   "
//                 >
//                   {/* Doctor Header */}
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
//                       <Stethoscope className="w-6 h-6 text-white" />
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {doctor.full_name}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         {doctor.specialization || "General"}
//                       </p>
//                     </div>

//                     {/* Quick refresh */}
//                     {selectedDate && (
//                       <button
//                         onClick={() => loadSlots(doctor.id)}
//                         className="text-sm font-medium text-blue-600 hover:text-blue-700"
//                         type="button"
//                       >
//                         Refresh
//                       </button>
//                     )}
//                   </div>

//                   {/* Slot Section */}
//                   <div className="mt-5">
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="text-sm font-semibold text-gray-700">
//                         Slots
//                       </p>

//                       {selectedDate && (
//                         <div className="flex items-center gap-3 text-xs">
//                           <span className="inline-flex items-center gap-1">
//                             <span className="w-3 h-3 rounded bg-green-600 inline-block" />
//                             <span className="text-gray-500">Available</span>
//                           </span>
//                           <span className="inline-flex items-center gap-1">
//                             <span className="w-3 h-3 rounded bg-gray-400 inline-block" />
//                             <span className="text-gray-500">Booked</span>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {!selectedDate ? (
//                       <div className="text-sm text-gray-400">
//                         Select a date to load slots.
//                       </div>
//                     ) : isLoadingThis ? (
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Loading slots...
//                       </div>
//                     ) : docSlots.length === 0 ? (
//                       <div className="text-sm text-gray-400">
//                         No slots available for this date.
//                       </div>
//                     ) : (
//                       <div className="flex flex-wrap gap-3">
//                         {docSlots.map((slot, index) => {
//                           const key = `${doctor.id}_${slot.start_time}_${slot.end_time}`;
//                           const isBookingThis = bookingKey === key;

//                           return (
//                             <SlotButton
//                               key={index}
//                               time={`${slot.start_time} - ${slot.end_time}`}
//                               available={slot.available}
//                               loading={isBookingThis}
//                               onClick={() => bookSlot(doctor.id, slot)}
//                             />
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </motion.div>
//     </PatientLayout>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Stethoscope, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import PatientLayout from "../../layouts/PatientLayout";
import SlotButton from "../../components/SlotButton";
import { getDoctors, getDoctorSlots, bookAppointment } from "../../api/booking";

const containerVariants = {
  hidden: { opacity: 50 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 50 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35 },
  },
};

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [loadingDoctorId, setLoadingDoctorId] = useState(null);
  const [bookingKey, setBookingKey] = useState(null); // `${doctorId}_${start}_${end}`

  // ✅ NEW: explicit doctors loading state (fixes “only date picker shows” confusion)
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Helpful min date (today) to prevent past selection
  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // 🔹 Load doctors on page load
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);

        const res = await getDoctors();

        // ✅ safer parsing (fixes nested response shapes)
        const list =
          Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setDoctors(list);
      } catch (err) {
        console.error("Failed to load doctors", err);
        toast.error("Failed to load doctors");
        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  // 🔹 Auto-load slots when date changes (for each doctor)
  useEffect(() => {
    if (!selectedDate) return;
    if (!doctors?.length) return;

    doctors.forEach((doc) => {
      loadSlots(doc.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, doctors]);

  // 🔹 Load slots for ONE doctor
  const loadSlots = async (doctorId) => {
    if (!selectedDate) return;

    try {
      setLoadingDoctorId(doctorId);

      const res = await getDoctorSlots(doctorId, selectedDate);
      const slotList =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      setSlots((prev) => ({
        ...prev,
        [doctorId]: slotList,
      }));
    } catch (err) {
      console.error("Failed to load slots", err);
      setSlots((prev) => ({
        ...prev,
        [doctorId]: [],
      }));
    } finally {
      setLoadingDoctorId(null);
    }
  };

  // 🔹 Book slot
  const bookSlot = async (doctorId, slot) => {
    if (!slot?.available) return;
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }

    const key = `${doctorId}_${slot.start_time}_${slot.end_time}`;
    setBookingKey(key);

    try {
      await bookAppointment({
        doctor_id: doctorId,
        appointment_date: selectedDate,
        start_time: slot.start_time,
        end_time: slot.end_time,
      });

      toast.success("Appointment booked successfully!", { icon: "✅" });

      // Refresh slots after booking so the button becomes grey/unavailable
      await loadSlots(doctorId);
    } catch (err) {
      console.error("Booking failed", err);
      toast.error("Slot already booked or error occurred", { icon: "❌" });
    } finally {
      setBookingKey(null);
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
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Book Appointment
            </h1>
            <p className="text-gray-500 mt-1">
              Pick a date, then choose an available slot for your preferred doctor.
            </p>
          </motion.div>

          {/* Date Picker Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Select Appointment Date</p>
                <p className="text-base font-semibold text-gray-800">
                  Choose a day to load all doctors’ slots
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="date"
                min={minDate}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="
                  w-full sm:w-72
                  px-4 py-3
                  rounded-xl
                  border border-gray-300
                  shadow-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-green-500
                  focus:border-green-500
                  cursor-pointer
                  text-gray-800
                "
              />

              {!selectedDate && (
                <span className="text-sm text-gray-500">
                  Please select a date to see available slots.
                </span>
              )}
            </div>
          </motion.div>

          {/* ✅ Doctors Section (FIXED render/hiding logic) */}
          {loadingDoctors ? (
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-gray-500"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading doctors...
            </motion.div>
          ) : doctors.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 text-center"
            >
              <p className="text-gray-500 text-lg">No doctors available</p>
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {doctors.map((doctor) => {
                const docSlots = slots[doctor.id] || [];
                const isLoadingThis = loadingDoctorId === doctor.id;

                return (
                  <motion.div
                    key={doctor.id}
                    variants={itemVariants}
                    className="
                      bg-white rounded-2xl shadow-md border border-gray-100 p-6
                      hover:shadow-lg transition-shadow
                    "
                  >
                    {/* Doctor Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                        <Stethoscope className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {doctor.full_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {doctor.specialization || "General"}
                        </p>
                      </div>

                      {/* Quick refresh */}
                      {selectedDate && (
                        <button
                          onClick={() => loadSlots(doctor.id)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                          type="button"
                        >
                          Refresh
                        </button>
                      )}
                    </div>

                    {/* Slot Section */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-700">
                          Slots
                        </p>

                        {selectedDate && (
                          <div className="flex items-center gap-3 text-xs">
                            <span className="inline-flex items-center gap-1">
                              <span className="w-3 h-3 rounded bg-green-600 inline-block" />
                              <span className="text-gray-500">Available</span>
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <span className="w-3 h-3 rounded bg-gray-400 inline-block" />
                              <span className="text-gray-500">Booked</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {!selectedDate ? (
                        <div className="text-sm text-gray-400">
                          Select a date to load slots.
                        </div>
                      ) : isLoadingThis ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading slots...
                        </div>
                      ) : docSlots.length === 0 ? (
                        <div className="text-sm text-gray-400">
                          No slots available for this date.
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3">
                          {docSlots.map((slot, index) => {
                            const key = `${doctor.id}_${slot.start_time}_${slot.end_time}`;
                            const isBookingThis = bookingKey === key;

                            return (
                              <SlotButton
                                key={index}
                                time={`${slot.start_time} - ${slot.end_time}`}
                                available={slot.available}
                                loading={isBookingThis}
                                onClick={() => bookSlot(doctor.id, slot)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>
    </PatientLayout>
  );
}
