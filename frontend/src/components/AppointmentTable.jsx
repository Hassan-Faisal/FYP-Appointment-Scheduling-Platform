export default function AppointmentTable({ data, role }) {
    return (
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Doctor/Patient</th>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Time</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((appt) => (
            <tr key={appt.id} className="border-b">
              <td className="p-3">{role === "patient" ? appt.doctorName : appt.patientName}</td>
              <td className="p-3">{appt.date}</td>
              <td className="p-3">{appt.time}</td>
              <td className="p-3">{appt.status}</td>
              <td className="p-3">
                {role === "patient" && appt.status === "booked" && (
                  <button className="px-3 py-1 bg-danger text-white rounded">Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  