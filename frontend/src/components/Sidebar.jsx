export default function Sidebar({ links }) {
    return (
      <div className="w-64 bg-white shadow h-screen p-4">
        <h2 className="text-xl font-bold mb-6 text-primary">Clinic</h2>
        {links.map(link => (
          <p
            key={link}
            className="py-2 text-gray-600 hover:text-primary cursor-pointer"
          >
            {link}
          </p>
        ))}
      </div>
    );
  }
  