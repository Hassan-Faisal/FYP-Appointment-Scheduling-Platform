import { useEffect, useState } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import SlotButton from "../../components/SlotButton";
import {
  getDoctors,
  getDoctorSlots,
  bookAppointment,
} from "../../api/booking";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  const loadSlots = async (doctorId) => {
    if (!selectedDate) return;
    const res = await getDoctorSlots(doctorId, selectedDate);
    setSlots((prev) => ({ ...prev, [doctorId]: res.data }));
  };

  const bookSlot = async (doctorId, slot) => {
    await bookAppointment({
      doctor_id: doctorId,
      appointment_date: selectedDate,
      start_time: slot.start_time,
      end_time: slot.end_time,
    });
    alert("Appointment booked!");
  };

  return (
    <PatientLayout>
      <h1 className="text-xl font-bold mb-4">Book Appointment</h1>

      <input
        type="date"
        className="border p-2 mb-6"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold">{doc.full_name}</h2>
            <p className="text-gray-500">{doc.specialization}</p>

            <button
              onClick={() => loadSlots(doc.id)}
              className="text-sm text-blue-600 mt-2"
            >
              Load Slots
            </button>

            <div className="mt-4 flex flex-wrap gap-2">
              {(slots[doc.id] || []).map((slot) => (
                <SlotButton
                  key={slot.start_time}
                  time={slot.start_time}
                  available={slot.available}
                  onClick={() => bookSlot(doc.id, slot)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PatientLayout>
  );
}
