import Navbar from "@/components/layout/PanelNavbar";
import PanelFooter from "@/components/layout/PanelFooter";
import TenantSidebar from "@/components/layout/TenantSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className=" bg-white">
        <TenantSidebar />
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen ml-3">
        {/* Sticky Header */}
        <div className="flex-shrink-0">
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-5 bg-gray-100 rounded-xl">
         
            {children}
          
        </main>

        {/* Sticky Footer */}
        <div className="flex-shrink-0">
          <PanelFooter />
        </div>
      </div>
    </div>
  );
}