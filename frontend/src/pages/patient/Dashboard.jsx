import PatientLayout from "../../layouts/PatientLayout";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
  const stats = [
    { title: "Upcoming Appointments", value: 3 },
    { title: "Missed Appointments", value: 1 },
    { title: "Completed Visits", value: 5 },
    { title: "Cancelled Appointments", value: 0 },
  ];

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
