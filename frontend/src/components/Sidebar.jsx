import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ links }) {
  return (
    <div className="w-64 bg-white shadow h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-primary">Clinic</h2>
      {links.map((link) => (
        <p
          key={link.path} // Use `link.path` or `link.label` to make it unique
          className="py-2 text-gray-600 hover:text-primary cursor-pointer"
        >
          <Link to={link.path}>{link.label}</Link>
        </p>
      ))}
    </div>
  );
}



// const Sidebar = ({ links }) => {
//   return (
//     <div>
//       <ul>
//         {links.map((link) => (
//           <li key={link.path}> {/* Use a unique key here */}
//             <Link to={link.path}>{link.label}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
