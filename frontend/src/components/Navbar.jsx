export default function Navbar() {
    return (
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-700">Dashboard</h1>
        <div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </div>
      </div>
    );
  }
  