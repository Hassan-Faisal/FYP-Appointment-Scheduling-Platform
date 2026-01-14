import { useEffect, useState } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import StatCard from "../../components/StatCard";
import { getPatientStats } from "../../api/patient";

export default function Dashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getPatientStats().then((res) => {
      setStats([
        { title: "Upcoming Appointments", value: res.data.upcoming },
        { title: "Missed Appointments", value: res.data.no_show },
        { title: "Completed Visits", value: res.data.completed },
        { title: "Cancelled Appointments", value: res.data.cancelled },
      ]);
    });
  }, []);

  return (
    <PatientLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} />
        ))}
      </div>
    </PatientLayout>
  );
}
