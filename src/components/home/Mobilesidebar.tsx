
import { X } from "react-feather";

function MobileSidebar({ sidebarOpen, setSidebarOpen } : { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${sidebarOpen ? '' : 'pointer-events-none opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 md:hidden flex flex-col
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-xl font-bold text-gray-800">classid</span>
            <button onClick={() => setSidebarOpen(false)} className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col mt-6 space-y-2 px-6">
            <a href="#" className="py-2 px-2 rounded text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-700" onClick={() => setSidebarOpen(false)}>Home</a>
            <a href="#" className="py-2 px-2 rounded text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-700" onClick={() => setSidebarOpen(false)}>About</a>
            <a href="#" className="py-2 px-2 rounded text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-700" onClick={() => setSidebarOpen(false)}>Course</a>
            <a href="#" className="py-2 px-2 rounded text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-700" onClick={() => setSidebarOpen(false)}>News</a>
            <a href="#" className="py-2 px-2 rounded text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-700" onClick={() => setSidebarOpen(false)}>Success Story</a>
          </nav>
          <div className="mt-auto px-6 pb-8 flex flex-col gap-2">
            <a href="#" className="text-teal-600 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50 text-center">Sign In</a>
            <a href="#" className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-700 text-center">Join Now</a>
          </div>
        </aside>
      </>
    );
  }

export default MobileSidebar;
