// components/Sidebar.tsx
export default function Sidebar() {
  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg z-20">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="mt-14 space-y-4">
          <li>
            <a
              href="/"
              className="block py-3 px-4 text-lg hover:bg-gray-700 rounded"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="dashboard/create-dataset" 
              className="block py-3 px-4 text-lg hover:bg-gray-700 rounded"
            >
              Create Dataset
            </a>
          </li>
          <li>
            <a
              href="dashboard/validate-dataset" 
              className="block py-3 px-4 text-lg hover:bg-gray-700 rounded"
            >
              Validate Dataset
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
