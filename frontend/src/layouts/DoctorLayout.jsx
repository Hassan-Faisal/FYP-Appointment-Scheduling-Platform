import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DoctorLayout({ children }) {
  const links = ["Today", "Upcoming Appointments", "History", "Profile"];
  return (
    <div className="flex h-screen">
      <Sidebar links={links} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-bgSoft flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
