import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-base-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden w-full relative">
        {showSidebar && <Sidebar />}
        <main
          className={`flex-1 overflow-y-auto w-full transition-none ${
            showSidebar
              ? "lg:pl-20 lg:peer-hover:blur-[2px] lg:peer-hover:brightness-95"
              : ""
          }`}
        >
          {children}
        </main>
      </div>
      {showSidebar && <BottomNav />}
    </div>
  );
};

export default Layout;
