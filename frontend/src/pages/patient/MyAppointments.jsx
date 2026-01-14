import { useEffect, useState } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import AppointmentTable from "../../components/AppointmentTable";
import {
  getMyUpcomingAppointments,
  getMyAppointmentHistory,
  cancelAppointment,
} from "../../api/patient";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const [upcoming, history] = await Promise.all([
      getMyUpcomingAppointments(),
      getMyAppointmentHistory(),
    ]);

    setAppointments([...upcoming.data, ...history.data]);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <PatientLayout>
      <h1 className="text-xl font-bold mb-4">My Appointments</h1>

      <AppointmentTable
        data={appointments}
        role="patient"
        onCancel={cancelAppointment}
      />
    </PatientLayout>
  );
}
